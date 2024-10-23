import { useContext, useRef, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { StateContext, StateT } from "./State.ts";
import {
  CardId,
  flipCard,
  moveById,
  RegionId,
  shuffleRegion,
  turnCard,
} from "./logic/api.ts";
import RegionModal, { CardCallbacks, RegionCallbacks } from "./RegionModal.tsx";
import {
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import GameDrawer, { FileKind } from "./GameDrawer.tsx";
import RegionTab from "./RegionTab.tsx";
import { safeEntries } from "./logic/utils.ts";
import TTSImage from "./TTSImage.tsx";

function App() {
  const stateC: StateT = useContext(StateContext);
  const [state, setState] = useState(stateC);
  const decks = safeEntries(state);

  const btnRef = useRef<HTMLButtonElement>(null);

  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const [deckId, setDeckId] = useState<string>(decks[0][0]);
  const [cardId, setCardId] = useState<CardId | undefined>();
  const [regionId, setRegionId] = useState<RegionId>("" /* FIXME */);

  const cardCallbacks: CardCallbacks = {
    draw: [
      "Draw",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: moveById(
              prevState[deckId].deck,
              regionId,
              "hand",
              new Set([cardId])
            ),
          },
        })),
    ],
    play: [
      "Play",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: moveById(
              prevState[deckId].deck,
              regionId,
              "play",
              new Set([cardId])
            ),
          },
        })),
    ],
    discard: [
      "Discard",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: moveById(
              prevState[deckId].deck,
              regionId,
              "discard",
              new Set([cardId])
            ),
          },
        })),
    ],
    destroy: [
      "Exile",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: moveById(
              prevState[deckId].deck,
              regionId,
              "destroy",
              new Set([cardId])
            ),
          },
        })),
    ],
    return: [
      "Return to Deck",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: moveById(
              prevState[deckId].deck,
              regionId,
              "deck",
              new Set([cardId])
            ),
          },
        })),
    ],
    flip: [
      "Flip",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: flipCard(prevState[deckId].deck, cardId, "toggle"),
          },
        })),
    ],
    turn: [
      "Turn",
      (cardId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: turnCard(prevState[deckId].deck, cardId, "clockwise"),
          },
        })),
    ],
  };

  const regionCallbacks: RegionCallbacks = {
    shuffle: [
      "Shuffle",
      (regionId) =>
        setState((prevState) => ({
          ...prevState,
          [deckId]: {
            ...prevState[deckId],
            deck: shuffleRegion(prevState[deckId].deck, regionId),
          },
        })),
    ],
    search: ["Search", () => {}],
  };

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

  const drawerCallbacks = {
    onLoadFromFile: (kind: FileKind): void => {
      const decks = [1];
      console.log(`${JSON.stringify(decks)} ${kind}`);
      onCloseDrawer();
    },
    onLoadFromClipboard: (kind: FileKind): void => {
      const decks = [1];
      console.log(`${JSON.stringify(decks)} ${kind}`);
      onCloseDrawer();
    },
    onResetGame: (): void => {
      onCloseDrawer();
    },
  };

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        ref={btnRef}
        onClick={onOpenDrawer}
        position="fixed"
        top="4"
        right="4"
        zIndex="overlay"
      />
      <GameDrawer
        btnRef={btnRef}
        isOpen={isOpenDrawer}
        onClose={onCloseDrawer}
        actionCallbacks={drawerCallbacks}
      />
      <TTSImage />
      {decks.length > 0 && (
        <Tabs
          defaultIndex={0}
          onChange={(index) => setDeckId(decks[index][0])}
          isFitted
          variant="enclosed-colored"
        >
          <Box
            overflow="auto"
            pb="40px"
            height="calc(100vh - 20px)"
            width="100vw"
          >
            <TabPanels>
              {decks.map(([deckId, deck]) => (
                <TabPanel key={deckId}>
                  <RegionTab
                    state={deck.deck}
                    onClick={(
                      regionId: RegionId,
                      cardId: CardId | undefined
                    ): void => {
                      setCardId(cardId);
                      setRegionId(regionId);
                      onOpenModal();
                    }}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
          <TabList
            mb="1em"
            position="fixed"
            width="100vw"
            bottom="-5"
            left="0"
            right="0"
            bg="white"
            zIndex="sticky"
          >
            {decks.map(([deckId, deck]) => (
              <Tab key={deckId} isDisabled={!deck.enabled}>
                {deck.deck.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      )}

      {regionId && (
        <RegionModal
          key={`${regionId}-modal`}
          state={state[deckId].deck}
          regionId={regionId}
          cardId={cardId}
          cardCallbacks={cardCallbacks}
          regionCallbacks={regionCallbacks}
          isOpen={isOpenModal}
          onClose={onCloseModal}
        />
      )}
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
