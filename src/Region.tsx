import { CSSProperties } from "react";
import { RegionId } from "./logic/api";
import { StateT } from "./State";
import { Card } from "./Card";
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Divider,
} from "@chakra-ui/react";

type Props = {
  state: StateT;
  regionId: RegionId;
  onDoubleClick: () => void;
};

const Region = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const region = props.state.regions[props.regionId]!;

  const topCardId =
    region.deck.length === 0 ? null : region.deck[region.deck.length - 1];

  const topCard = topCardId ? props.state.cards[topCardId] ?? null : null;

  const borderRadius = 16;
  const distance = 12;
  const innerRadius = borderRadius - distance;

  const boxContainerStyle: CSSProperties = {
    width: "250px",
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #3498db",
    borderRadius: `${borderRadius}px`,
    transition: "all 0.3s ease",
    padding: `${distance}px`,
  };

  const innerRectangleStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: `${innerRadius}px`,
    transition: "opacity 0.3s ease",
  };

  return (
    <>
      <div
        style={{
          ...boxContainerStyle,
          position: "relative",
        }}
        onClick={onOpen}
        onDoubleClick={props.onDoubleClick}
      >
        <div
          style={{
            position: "absolute",
            top: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#3498db",
            padding: "2px 6px",
            fontSize: "14px",
            fontWeight: "bold",
            color: "white",
            borderRadius: "4px",
          }}
        >
          {region.region.label}
        </div>

        <div style={innerRectangleStyle}>
          {topCard && <Card cardState={topCard} />}
        </div>
      </div>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        blockScrollOnMount={true}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {region.region.label}
            {topCard && ` [1/${region.deck.length}] - ${topCard.card.label}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex direction={"column"} gap={"8px"}>
              {topCard && (
                <HStack>
                  <div
                    style={{
                      width: "175px",
                      height: "245px",
                      backgroundColor: "#3498db",
                      borderRadius: `${innerRadius}px`,
                    }}
                  >
                    <Card cardState={topCard} />
                  </div>
                  <Text>{topCard.card.description}</Text>
                </HStack>
              )}
              <Button onClick={onClose}>Draw</Button>
              <Button onClick={onClose}>Play</Button>
              <Button onClick={onClose}>Discard</Button>
              <Button onClick={onClose}>Destroy</Button>
              <Button onClick={onClose}>Flip</Button>
              <Button onClick={onClose}>Turn</Button>
              <Divider />
              <Button onClick={onClose}>Shuffle</Button>
              <Button onClick={onClose}>Search</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Region;
