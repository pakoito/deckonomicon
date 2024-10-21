import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  HStack,
  Button,
  Divider,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { Card } from "./Card";
import { safeEntries } from "./logic/utils";
import { CardId, RegionId } from "./logic/api";
import { StateT } from "./State";
import { useState } from "react";

export type CardCallbacks = Record<string, [string, (id: CardId) => void]>;

export type RegionCallbacks = Record<string, [string, (id: RegionId) => void]>;

export type Props = {
  state: StateT;
  regionId: RegionId;
  cardCallbacks: CardCallbacks;
  regionCallbacks: RegionCallbacks;
  getOnOpen: (onOpen: (cardId: CardId | undefined) => void) => void;
};

const RegionModal = (props: Props) => {
  const [cardId, setCardId] = useState<CardId>();

  const region = props.state.regions[props.regionId]!;

  const card = cardId ? props.state.cards[cardId] ?? null : null;

  const { isOpen, onOpen, onClose } = useDisclosure();

  props.getOnOpen((cardId) => {
    onOpen();
    setCardId(cardId);
  });

  return (
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
          {card &&
            ` [1/${region.deck.length}] - ${
              card.facing === "front"
                ? card.card.front.label
                : card.card.back.label
            }`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex direction={"column"} gap={"8px"}>
            {card && (
              <HStack>
                <div
                  style={{
                    width: "175px",
                    height: "245px",
                    backgroundColor: "#3498db",
                    borderRadius: "16px",
                  }}
                >
                  <Card cardState={card} />
                </div>
                <Text>
                  {card.facing === "front"
                    ? card.card.front.description
                    : card.card.back.description}
                </Text>
              </HStack>
            )}
            {cardId &&
              card &&
              safeEntries(props.cardCallbacks).map(
                ([key, [label, callback]]) => (
                  <Button
                    key={key}
                    onClick={() => {
                      onClose();
                      callback(cardId);
                    }}
                  >
                    {label}
                  </Button>
                )
              )}
            {cardId && card && <Divider />}
            {safeEntries(props.regionCallbacks).map(
              ([key, [label, callback]]) => (
                <Button
                  key={key}
                  onClick={() => {
                    onClose();
                    callback(props.regionId);
                  }}
                >
                  {label}
                </Button>
              )
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegionModal;
