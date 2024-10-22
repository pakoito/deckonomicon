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
  Text,
} from "@chakra-ui/react";
import { Card } from "./Card";
import { safeEntries } from "./logic/utils";
import { CardId, Deck, RegionId } from "./logic/api";

export type CardCallbacks = Record<string, [string, (id: CardId) => void]>;

export type RegionCallbacks = Record<string, [string, (id: RegionId) => void]>;

export type Props = {
  state: Deck;
  regionId: RegionId;
  cardId: CardId | undefined;
  cardCallbacks: CardCallbacks;
  regionCallbacks: RegionCallbacks;
  isOpen: boolean;
  onClose: () => void;
};

const RegionModal = (props: Props) => {
  const { isOpen, onClose, cardId } = props;

  const region = props.state.regions[props.regionId]!;

  const card = cardId ? props.state.cards[cardId] ?? null : null;

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
          {cardId &&
            card &&
            ` [${region.deck.indexOf(cardId) + 1}/${region.deck.length}] - ${
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
