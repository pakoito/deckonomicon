import { useContext, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
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
import { Box, Flex } from "@chakra-ui/react";

function App() {
  const stateC: StateT = useContext(StateContext);
  const [state, setState] = useState(stateC);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: ".png,.jpg,.jpeg",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 10 }),
      new FileTypeValidator(["jpg", "png", "jpeg"]),
      new FileSizeValidator({ maxFileSize: 10 * 1024 * 1024 /* 10 MB */ }),
      /*new ImageDimensionsValidator({
        maxHeight: 900, // in pixels
        maxWidth: 1600,
        minHeight: 10,
        minWidth: 10,
      }),*/
    ],
  });

  return (
    <>
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
