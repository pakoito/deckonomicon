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
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import GameDrawer, { FileKind } from "./GameDrawer.tsx";
import RegionTab from "./RegionTab.tsx";

function App() {
  const stateC: StateT = useContext(StateContext);
  const [state, setState] = useState(stateC);

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

  const [cardId, setCardId] = useState<CardId>();
  const [regionId, setRegionId] = useState<RegionId>("" /* FIXME */);

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
        setState((prevState) => turnCard(prevState, cardId, "clockwise")),
    ],
  };

  const regionCallbacks: RegionCallbacks = {
    shuffle: [
      "Shuffle",
      (regionId) => setState((prevState) => shuffleRegion(prevState, regionId)),
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
      console.log(kind);
      onCloseDrawer();
    },
    onLoadFromClipboard: (kind: FileKind): void => {
      console.log(kind);
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
      <RegionTab
        state={state}
        onClick={(regionId: RegionId, cardId: CardId | undefined): void => {
          setCardId(cardId);
          setRegionId(regionId);
          onOpenModal();
        }}
      />
      {regionId && (
        <RegionModal
          key={`${regionId}-modal`}
          state={state}
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
