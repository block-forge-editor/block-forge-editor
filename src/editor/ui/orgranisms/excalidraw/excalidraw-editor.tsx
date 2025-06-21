import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import { TExcalidrawData } from "./types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState } from "@excalidraw/excalidraw/types";

type TExcalidrawEditorProps = {
  blockId: string;
  initialData?: TExcalidrawData;
  onUpdate: (data: TExcalidrawData) => void;
  isOpen?: boolean;
};

export const ExcalidrawEditor: FC<TExcalidrawEditorProps> = ({
  blockId,
  initialData,
  onUpdate,
  isOpen = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

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

  // TODO: ExcaliDraw issue https://github.com/excalidraw/excalidraw/issues/7312
  useEffect(() => {
    if (isOpen) {
      const timerId = setTimeout(() => {
        setShouldRender(true);
      }, 200);

      return () => {
        clearTimeout(timerId);
        setShouldRender(false);
      };
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && shouldRender && containerRef.current) {
      const timersId = setTimeout(() => {
        if (containerRef.current) {
          window.dispatchEvent(new Event("resize"));
        }
      }, 150);

      return () => {
        clearTimeout(timersId);
      };
    }
  }, [isOpen, shouldRender]);

  return (
    <div className="bf-flex-1 bf-space-y-4 bf-overflow-auto custom-scroll bf-p-4">
      <div
        ref={containerRef}
        className="bf-w-full sm:bf-w-[70%] bf-mx-auto bf-h-[70vh] bf-relative"
      >
        {shouldRender ? (
          <Excalidraw
            initialData={initialData}
            onChange={(elements, appState, files) => {
              handleUpdate(elements, appState, files);
            }}
            theme="light"
            name={`excalidraw-${blockId}`}
          />
        ) : (
          <div className="bf-w-full bf-h-full bf-flex bf-items-center bf-justify-center bf-bg-gray-100 bf-rounded-lg">
            <div className="bf-text-gray-500">Loading editor...</div>
          </div>
        )}
      </div>
    </div>
  );
};
