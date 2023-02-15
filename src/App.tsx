import { lazy, Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const Count = lazy(() =>
  import("./components/count").then((module) => ({ default: module.Count }))
);

function App() {
  const [isShowingCount, setIsShowingCount] = useState(false);

  return (
    <Suspense fallback="loading...">
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          {isShowingCount && <Count />}

          <div>
            <button onClick={() => setIsShowingCount((value) => !value)}>
              {isShowingCount ? "Hide" : "Show"} Count Button
            </button>
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Suspense>
  );
}

export default App;
