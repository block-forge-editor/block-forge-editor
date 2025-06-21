import { FC, useCallback } from "react";

import { EditorConfig, OutputData } from "@editorjs/editorjs";

import { COLUMNS_EDITOR_TOOLS } from "@/editor/lib/tools";
import { useEditor } from "@/editor/lib/use-editor";

import { Button, DrawerClose, DrawerFooter } from "@/editor/ui/shadcn";

type TColumnEditorProps = {
  blockId: string;
  onClose: () => void;
  initialData?: null | OutputData;
  onSave: (data: OutputData) => void;
};

export const ColumnEditor: FC<TColumnEditorProps> = ({
  initialData,
  onSave,
  onClose,
  blockId,
}) => {
  const editorInstance = useEditor({
    tools: COLUMNS_EDITOR_TOOLS as unknown as EditorConfig["tools"],
    id: `column-editor-${blockId}`,
    initialData,
  });

  const handleSave = useCallback(async () => {
    if (!editorInstance.current) return;

    const data = await editorInstance.current.save();
    onSave(data);
    onClose();
  }, [editorInstance, onSave, onClose]);

  return (
    <>
      <div className="bf-flex-1 bf-overflow-auto custom-scroll bf-p-4">
        <div
          id={`column-editor-${blockId}`}
          className="bf-min-h-screen bf-mx-auto bf-w-full sm:bf-w-[70%] bf-bg-white bf-shadow-md bf-rounded-lg"
        />
      </div>

      <DrawerFooter>
        <div className="bf-flex bf-mx-auto bf-w-full sm:bf-w-[70%] bf-justify-end bf-gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={() => void handleSave()}>Save Changes</Button>
        </div>
      </DrawerFooter>
    </>
  );
};
