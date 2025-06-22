import { FC, useState } from "react";
import { Pencil, ExternalLink } from "lucide-react";

import { TExcalidrawData } from "./types";
import { ExcalidrawEditorDrawer } from "./excalidraw-editor-drawer";
import { getExcalidrawSceneUrl } from "./lib";

import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { ExcalidrawEditor } from "./excalidraw-editor";
import { TOOLBOX_TITLE } from "./constants";

type TExcalidrawComponentProps = {
  blockId: string;
  data: TExcalidrawData;
  onUpdate: (data: TExcalidrawData) => void;
  onSave: VoidFunction;
};

export const ExcalidrawComponent: FC<TExcalidrawComponentProps> = ({
  blockId,
  data,
  onUpdate,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    onSave();
  };

  const handleOpenInExcalidraw = () => {
    window.open(getExcalidrawSceneUrl(data.sceneId), "_blank");
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Component for creating and editing drawings"
      />

      <div className="bf-border-b bf-min-h-[200px] bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item">
        <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
          <div className="bf-flex-1">
            <div className="bf-flex bf-flex-col bf-gap-2">
              {data.title && (
                <h3 className="bf-text-lg bf-font-semibold bf-text-gray-900">
                  {data.title}
                </h3>
              )}

              {data.description && (
                <p className="bf-text-sm bf-text-gray-600">
                  {data.description}
                </p>
              )}

              <div className="bf-w-full bf-h-[200px] bf-bg-white bf-rounded-lg bf-overflow-hidden bf-border">
                {data.imageUrl ? (
                  <img
                    src={data.imageUrl}
                    alt="Drawing preview"
                    className="bf-w-full bf-h-full bf-object-contain"
                  />
                ) : data.sceneId ? (
                  <div className="bf-w-full bf-h-full bf-flex bf-items-center bf-justify-center bf-text-gray-400">
                    <div className="bf-text-center">
                      <div className="bf-mb-2">Drawing available</div>
                      <button
                        onClick={handleOpenInExcalidraw}
                        className="bf-flex bf-items-center bf-gap-1 bf-text-blue-600 hover:bf-text-blue-800 bf-text-sm"
                      >
                        <ExternalLink className="bf-size-3" />
                        Open in Excalidraw
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bf-w-full bf-h-full bf-flex bf-items-center bf-justify-center bf-text-gray-400">
                    No drawing yet
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bf-flex bf-flex-col bf-gap-2">
            <EditorButton
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="bf-size-4" />
            </EditorButton>

            {data.sceneId && (
              <EditorButton
                variant="secondary"
                onClick={handleOpenInExcalidraw}
              >
                <ExternalLink className="bf-size-4" />
              </EditorButton>
            )}
          </div>
        </div>
      </div>

      <ExcalidrawEditorDrawer
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
      >
        <ExcalidrawEditor
          blockId={blockId}
          initialData={data}
          onUpdate={onUpdate}
          isOpen={isEditing}
        />
      </ExcalidrawEditorDrawer>
    </div>
  );
};
