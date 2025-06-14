import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState } from "@excalidraw/excalidraw/types";

export type TExcalidrawData = {
  elements: ExcalidrawElement[];
  appState: AppState;
  files?: Record<string, any>;
};
