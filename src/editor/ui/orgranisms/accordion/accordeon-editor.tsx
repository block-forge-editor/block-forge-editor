import { FC, useState, useCallback } from "react";

import { EditorConfig, OutputData } from "@editorjs/editorjs";

import { ACCORDION_EDITOR_TOOLS } from "@/editor/lib/tools";
import { useEditor } from "@/editor/lib/use-editor";

import { Label } from "@/editor/ui/atoms";
import { Input, Button, DrawerClose, DrawerFooter } from "@/editor/ui/shadcn";

type TAccordionEditorProps = {
  blockId: string;
  onClose: () => void;
  initialTitle?: string;
  initialData?: null | OutputData;
  onSave: (data?: null | OutputData, title?: string) => void;
};

export const AccordionEditor: FC<TAccordionEditorProps> = ({
  blockId,
  initialData,
  onSave,
  onClose,
  initialTitle,
}) => {
  const [title, setTitle] = useState(initialTitle);

  const editorInstance = useEditor({
    id: `accordion-editor-${blockId}`,
    initialData,
    tools: ACCORDION_EDITOR_TOOLS as unknown as EditorConfig["tools"],
  });

  const handleSave = useCallback(async () => {
    if (!editorInstance.current) return;

    const data = await editorInstance.current.save();
    onSave(data, title);
    onClose();
  }, [editorInstance, onSave, onClose, title]);

  return (
    <>
      <div className="bf-flex-1 bf-space-y-4 bf-overflow-auto custom-scroll bf-p-4">
        <div className="bf-w-[70%] bf-mx-auto bf-space-y-2">
          <Label
            htmlFor="accordion-title"
            className="bf-text-sm bf-font-normal bf-text-neutral-500 bf-dark:bf-text-neutral-400"
          >
            Accordion Title
          </Label>
          <Input
            value={title}
            id="accordion-title"
            placeholder="Enter accordion title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div
          id={`accordion-editor-${blockId}`}
          className="bf-min-h-screen bf-mx-auto bf-w-[70%] bf-bg-white bf-shadow-md bf-rounded-lg"
        />
      </div>

      <DrawerFooter>
        <div className="bf-flex bf-mx-auto bf-w-[70%] bf-justify-end bf-gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={() => void handleSave()}>Save Changes</Button>
        </div>
      </DrawerFooter>
    </>
  );
};
