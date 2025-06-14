import React from "react";
import ReactDOM from "react-dom/client";
import { BlockForgeEditor } from "./editor";

if (process.env.NODE_ENV === "development") {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <BlockForgeEditor id="block-forge-editor" />
    </React.StrictMode>,
  );
}

export { BlockForgeEditor } from "./editor";
