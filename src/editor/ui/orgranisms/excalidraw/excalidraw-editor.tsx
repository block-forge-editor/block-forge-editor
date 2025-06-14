import { FC, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import { TExcalidrawData } from "./types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState } from "@excalidraw/excalidraw/types";

type TExcalidrawEditorProps = {
  blockId: string;
  initialData?: TExcalidrawData;
  onUpdate: (data: TExcalidrawData) => void;
};

export const ExcalidrawEditor: FC<TExcalidrawEditorProps> = ({
  blockId,
  initialData,
  onUpdate,
}) => {
  const handleUpdate = useCallback(
    (
      elements: readonly ExcalidrawElement[],
      appState: AppState,
      files: Record<string, any>,
    ) => {
      onUpdate({
        elements: [...elements],
        appState,
        files,
      });
    },
    [onUpdate],
  );

  return (
    <div className="bf-flex-1 bf-space-y-4 bf-overflow-auto custom-scroll bf-p-4">
      <div className="bf-w-[70%] bf-mx-auto bf-h-[80vh]">
        <Excalidraw
          initialData={initialData}
          onChange={(elements, appState, files) => {
            handleUpdate(elements, appState, files);
          }}
          theme="light"
          name={`excalidraw-${blockId}`}
        />
      </div>
    </div>
  );
};
