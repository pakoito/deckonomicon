import { useContext, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
import Region from "./Region.tsx";
import { StateContext, StateT } from "./State.ts";
import { safeEntries } from "./logic/utils.ts";
import { flipTopRegion } from "./logic/api.ts";

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
      <h1>deckonomicon</h1>
      <div className="card">
        {safeEntries(state.regions).map(([regionId]) => (
          <Region
            key={regionId}
            state={state}
            onClick={() => {}}
            onDoubleClick={() => {
              setState((s) => flipTopRegion(s, regionId, "toggle"));
            }}
            regionId={regionId}
          ></Region>
        ))}
      </div>
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
      <div className="card">{JSON.stringify(state, null, 2)}</div>
    </>
  );
}

export default App;
