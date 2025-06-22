import { FC, useCallback, useEffect, useState } from "react";

import { TExcalidrawData } from "./types";
import { getExcalidrawEmbedUrl, handleExcalidrawMessage } from "./lib";

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
  const [sceneId, setSceneId] = useState<string | undefined>(
    initialData?.sceneId,
  );
  const [iframeKey, setIframeKey] = useState(0);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      handleExcalidrawMessage(event, (data) => {
        const newSceneId = data.sceneId;
        if (newSceneId && newSceneId !== sceneId) {
          setSceneId(newSceneId);
          onUpdate({
            sceneId: newSceneId,
            title: data.title || initialData?.title,
            description: data.description || initialData?.description,
          });
        }
      });
    },
    [sceneId, onUpdate, initialData],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [isOpen, handleMessage]);

  useEffect(() => {
    if (isOpen) {
      // Обновляем ключ iframe при открытии для пересоздания
      setIframeKey((prev) => prev + 1);
    }
  }, [isOpen]);

  return (
    <div className="bf-flex-1 bf-space-y-4 bf-overflow-auto custom-scroll bf-p-4">
      <div className="bf-w-full sm:bf-w-[70%] bf-mx-auto bf-h-[70vh] bf-relative">
        {isOpen ? (
          <iframe
            key={iframeKey}
            src={getExcalidrawEmbedUrl(sceneId)}
            className="bf-w-full bf-h-full bf-border-0 bf-rounded-lg"
            title="Excalidraw Editor"
            allow="clipboard-read; clipboard-write"
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
