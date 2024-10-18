import { useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>deckonomicon</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Load a deck
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          Download a deck
        </button>
      </div>
      <PWABadge />
    </>
  );
}

export default App;
