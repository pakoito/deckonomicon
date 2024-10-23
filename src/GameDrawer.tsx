import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Button,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  DrawerFooter,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export type FileKind = "dnz" | "tts";

export type ActionCallbacks = {
  onLoadFromFile: (kind: FileKind) => void;
  onLoadFromClipboard: (kind: FileKind) => void;
  onResetGame: () => void;
};

export type Props = {
  btnRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
  actionCallbacks: ActionCallbacks;
};

const GameDrawer = (props: Props) => {
  const { isOpen, onClose } = props;

  const [sliderValue, setSliderValue] = useState(1);

  const sliderLabelStyles = {
    mt: "2",
    ml: "0",
    fontSize: "sm",
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={props.btnRef}
      size={"lg"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Deckonomicon</DrawerHeader>

        <DrawerBody>
          <Accordion defaultIndex={[]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Load Deckonomicon
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex direction={"column"} gap={"4px"}>
                  <Button
                    onClick={() => props.actionCallbacks.onLoadFromFile("dnz")}
                  >
                    Load from File
                  </Button>
                  <Button
                    onClick={() =>
                      props.actionCallbacks.onLoadFromClipboard("dnz")
                    }
                  >
                    Load from Clipboard URL
                  </Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Load TTS
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex direction={"column"} gap={"4px"}>
                  <Button
                    onClick={() => props.actionCallbacks.onLoadFromFile("tts")}
                  >
                    Load from File
                  </Button>
                  <Button
                    onClick={() =>
                      props.actionCallbacks.onLoadFromClipboard("tts")
                    }
                  >
                    Load from Clipboard URL
                  </Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Scaling
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} margin={"10px"}>
                <Slider
                  defaultValue={1}
                  min={1}
                  max={4}
                  step={1}
                  onChange={(val) => setSliderValue(val)}
                >
                  <SliderMark value={1} {...sliderLabelStyles}>
                    x1
                  </SliderMark>
                  <SliderMark value={2} {...sliderLabelStyles}>
                    x2
                  </SliderMark>
                  <SliderMark value={3} {...sliderLabelStyles}>
                    x3
                  </SliderMark>
                  <SliderMark value={4} {...sliderLabelStyles}>
                    x4
                  </SliderMark>
                  <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="#3498db"
                    color="white"
                    mt="3"
                    ml="-1"
                    w="6"
                    borderRadius="3px"
                  >
                    x{sliderValue}
                  </SliderMark>
                  <SliderTrack bg="red.100">
                    <SliderFilledTrack bg="#3498db" />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </DrawerBody>

        <DrawerFooter>
          <HStack>
            <Button
              variant="outline"
              mr={3}
              onClick={props.actionCallbacks.onResetGame}
            >
              Reset Game
            </Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              Return
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameDrawer;
