import { FC, useState } from "react";
import { Pencil } from "lucide-react";

import { TExcalidrawData } from "./types";
import { ExcalidrawEditorDrawer } from "./excalidraw-editor-drawer";

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

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Component for creating and editing drawings"
      />

      <div className="bf-min-h-[200px]">
        <div className="bf-grid bf-grid-cols-1 bf-gap-4">
          <div className="bf-border-b bf-border-r bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item">
            <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
              <div className="bf-flex-1">
                <div className="bf-flex bf-items-center bf-justify-between">
                  <div className="bf-w-full bf-h-[300px] bf-bg-white bf-rounded-lg bf-shadow-sm bf-overflow-hidden">
                    {data.imageUrl ? (
                      <img
                        src={data.imageUrl}
                        alt="Drawing preview"
                        className="bf-w-full bf-h-full bf-object-contain"
                      />
                    ) : (
                      <div className="bf-w-full bf-h-full bf-flex bf-items-center bf-justify-center bf-text-gray-400">
                        No drawing yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <EditorButton
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="bf-size-4" />
              </EditorButton>
            </div>
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
        />
      </ExcalidrawEditorDrawer>
    </div>
  );
};
