import { FC, useState } from "react";
import { Pencil } from "lucide-react";
import { exportToSvg } from "@excalidraw/excalidraw";

import { TExcalidrawData } from "./types";
import { ExcalidrawEditorDrawer } from "./excalidraw-editor-drawer";

import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSave = () => {
    setIsEditing(false);
    onSave();
  };

  const updatePreview = async () => {
    if (data.elements.length > 0) {
      const svg = await exportToSvg({
        elements: data.elements,
        appState: data.appState,
        files: data.files,
        exportPadding: 10,
      });
      const svgString = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  useState(() => {
    void updatePreview();
  });

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Drawing"
        tooltipText="Component for creating and editing drawings"
      />

      <div className="bf-min-h-[200px]">
        <div className="bf-grid bf-grid-cols-1 bf-gap-4">
          <div className="bf-border-b bf-border-r bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item">
            <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
              <div className="bf-flex-1">
                <div className="bf-flex bf-items-center bf-justify-between">
                  <div className="bf-w-full bf-h-[300px] bf-bg-white bf-rounded-lg bf-shadow-sm bf-overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
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
        blockId={blockId}
        isOpen={isEditing}
        initialData={data}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        onUpdate={onUpdate}
      />
    </div>
  );
};
