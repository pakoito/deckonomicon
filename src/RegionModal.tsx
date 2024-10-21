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

export type CardCallbacks = Record<string, [string, (id: CardId) => void]>;

export type RegionCallbacks = Record<string, [string, (id: RegionId) => void]>;

export type Props = {
  state: StateT;
  regionId: RegionId;
  cardCallbacks: CardCallbacks;
  regionCallbacks: RegionCallbacks;
  getOnOpen: (onOpen: () => void) => void;
};

const RegionModal = (props: Props) => {
  const region = props.state.regions[props.regionId]!;

  const topCardId =
    region.deck.length === 0 ? null : region.deck[region.deck.length - 1];

  const topCard = topCardId ? props.state.cards[topCardId] ?? null : null;

  const { isOpen, onOpen, onClose } = useDisclosure();

  props.getOnOpen(onOpen);

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
          {topCard &&
            ` [1/${region.deck.length}] - ${
              topCard.facing === "front"
                ? topCard.card.front.label
                : topCard.card.back.label
            }`}
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
                    borderRadius: "16px",
                  }}
                >
                  <Card cardState={topCard} />
                </div>
                <Text>
                  {topCard.facing === "front"
                    ? topCard.card.front.description
                    : topCard.card.back.description}
                </Text>
              </HStack>
            )}
            {topCardId &&
              topCard &&
              safeEntries(props.cardCallbacks).map(
                ([key, [label, callback]]) => (
                  <Button
                    key={key}
                    onClick={() => {
                      onClose();
                      callback(topCardId);
                    }}
                  >
                    {label}
                  </Button>
                )
              )}
            {topCardId && topCard && <Divider />}
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
