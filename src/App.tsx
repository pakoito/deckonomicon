import { createContext, useContext, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";

type Card = {
  content:
    | { ctype: "image-net"; url: string }
    | { ctype: "image-local"; blob: string }
    | { ctype: "text"; text: string };
};

const Regions = {
  deck: {},
};

type RegionsT = typeof Regions;

type CardStateT = {
  card: Card;
  region: keyof RegionsT;
};

const State = {
  cards: [] as CardStateT[],
};

type StateT = typeof State;

const StateContext = createContext(State);

function App() {
  const state: StateT = useContext(StateContext);

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

  if (filesContent) {
    state.cards = filesContent.map((file) => ({
      card: {
        content: { ctype: "image-local", blob: file.content },
      },
      region: "deck",
    }));
  }

  return (
    <>
      <h1>deckonomicon</h1>
      <div className="card">
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
      <PWABadge />
    </>
  );
}

export default App;
