import { useContext, useRef, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import RegionStack from "./RegionStack.tsx";
import { StateContext, StateT } from "./State.ts";
import { safeEntries } from "./logic/utils.ts";
import {
  CardId,
  flipCard,
  moveById,
  shuffleRegion,
  turnCard,
} from "./logic/api.ts";
import RegionModal, { CardCallbacks, RegionCallbacks } from "./RegionModal.tsx";
import RegionBoard from "./RegionBoard.tsx";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function App() {
  const stateC: StateT = useContext(StateContext);
  const [state, setState] = useState(stateC);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const [sliderValue, setSliderValue] = useState(1);

  // const [imageUrl, setImageUrl] = useState<string | null>(null);

  // const { openFilePicker, filesContent, loading, errors } = useFilePicker({
  //   readAs: "DataURL",
  //   accept: ".png,.jpg,.jpeg",
  //   multiple: true,
  //   validators: [
  //     new FileAmountLimitValidator({ max: 10 }),
  //     new FileTypeValidator(["jpg", "png", "jpeg"]),
  //     new FileSizeValidator({ maxFileSize: 10 * 1024 * 1024 /* 10 MB */ }),
  //     /*new ImageDimensionsValidator({
  //       maxHeight: 900, // in pixels
  //       maxWidth: 1600,
  //       minHeight: 10,
  //       minWidth: 10,
  //     }),*/
  //   ],
  // });

  const sliderLabelStyles = {
    mt: "2",
    ml: "0",
    fontSize: "sm",
  };

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        ref={btnRef}
        onClick={onOpen}
        position="fixed"
        top="4"
        right="4"
        zIndex="overlay"
      />
      <Flex gap="20px" direction={"column"}>
        {safeEntries(state.regions).map(([regionId]) => {
          const region = state.regions[regionId]!;
          const cardCallbacks: CardCallbacks = {
            draw: [
              "Draw",
              (cardId) =>
                setState((prevState) =>
                  moveById(prevState, regionId, "hand", new Set([cardId]))
                ),
            ],
            play: [
              "Play",
              (cardId) =>
                setState((prevState) =>
                  moveById(prevState, regionId, "play", new Set([cardId]))
                ),
            ],
            discard: [
              "Discard",
              (cardId) =>
                setState((prevState) =>
                  moveById(prevState, regionId, "discard", new Set([cardId]))
                ),
            ],
            destroy: [
              "Exile",
              (cardId) =>
                setState((prevState) =>
                  moveById(prevState, regionId, "destroy", new Set([cardId]))
                ),
            ],
            return: [
              "Return to Deck",
              (cardId) =>
                setState((prevState) =>
                  moveById(prevState, regionId, "deck", new Set([cardId]))
                ),
            ],
            flip: [
              "Flip",
              (cardId) =>
                setState((prevState) => flipCard(prevState, cardId, "toggle")),
            ],
            turn: [
              "Turn",
              (cardId) =>
                setState((prevState) =>
                  turnCard(prevState, cardId, "clockwise")
                ),
            ],
          };

          const regionCallbacks: RegionCallbacks = {
            shuffle: [
              "Shuffle",
              (regionId) =>
                setState((prevState) => shuffleRegion(prevState, regionId)),
            ],
            search: ["Search", () => {}],
          };

          let onOpen: (cardId: CardId | undefined) => void = () => {};
          return (
            <Box key={`${regionId}-stack`}>
              {region.region.config.rtype === "stack" && (
                <RegionStack
                  key={`${regionId}-stack`}
                  state={state}
                  regionId={regionId}
                  onClick={() => onOpen(region.deck[0])}
                />
              )}
              {region.region.config.rtype === "board" && (
                <RegionBoard
                  key={`${regionId}-board`}
                  state={state}
                  regionId={regionId}
                  onClickRegion={() => onOpen(region.deck[0])}
                  onClickCard={(_, cardId) => onOpen(cardId)}
                />
              )}
              <RegionModal
                key={`${regionId}-modal`}
                state={state}
                regionId={regionId}
                cardCallbacks={cardCallbacks}
                regionCallbacks={regionCallbacks}
                getOnOpen={(f) => {
                  onOpen = f;
                }}
              />
            </Box>
          );
        })}
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Deckonomicon</DrawerHeader>

          <DrawerBody>
            <Accordion defaultIndex={[]} allowMultiple allowToggle>
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
                    <Button onClick={() => {}}>Load from File</Button>
                    <Button onClick={() => {}}>Load from Clipboard</Button>
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
                    <Button onClick={() => {}}>Load from File</Button>
                    <Button onClick={() => {}}>Load from Clipboard</Button>
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
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* <div className="card">
        <input type="url" onChange={(e) => setImageUrl(e.target.value)} />
        {imageUrl && (
          <div key={filesContent.length}>
            <img alt={imageUrl} src={imageUrl}></img>
            <br />
          </div>
        )}
      </div>
      <div className="card">
        {!loading && (
          <button onClick={() => openFilePicker()}>Load a deck</button>
        )}
        {loading && <div>Loading</div>}
        {errors.length != 0 && <div>Error {JSON.stringify(errors)}</div>}
        {filesContent.length != 0 &&
          filesContent.map((file, index) => (
            <div key={index}>
              <h2>{file.name}</h2>
              <img alt={file.name} src={file.content}></img>
              <br />
            </div>
          ))}
      </div>
      <div className="card">{JSON.stringify(state, null, 2)}</div> */}
      <PWABadge />
    </>
  );
}

export default App;
