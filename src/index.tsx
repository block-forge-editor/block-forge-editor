import React from "react";
import ReactDOM from "react-dom/client";
import { BlockForgeEditor } from "./editor";
import type { TTheme } from "./editor/lib/theme";
import type { TEditorLayout } from "./editor/types/common";

if (process.env.NODE_ENV === "development") {
  // Dev playground: ?theme=light|dark|system&layout=page|embedded&menubar=0
  const params = new URLSearchParams(window.location.search);
  const theme = (params.get("theme") ?? "light") as TTheme;
  const layout = (params.get("layout") ?? "page") as TEditorLayout;
  const showMenubar = params.get("menubar") !== "0";

  document.body.dataset.theme = theme;

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <div className={layout === "embedded" ? "dev-embedded" : undefined}>
        <BlockForgeEditor
          id="block-forge-editor"
          toolPreset="full"
          theme={theme}
          layout={layout}
          showMenubar={showMenubar}
        />
      </div>
    </React.StrictMode>,
  );
}

export { BlockForgeEditor } from "./editor";
