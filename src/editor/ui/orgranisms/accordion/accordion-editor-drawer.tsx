import { FC } from "react";

import { OutputData } from "@editorjs/editorjs";

import { AccordionEditor } from "./accordeon-editor";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerDescription,
} from "@/editor/ui/shadcn/ui/drawer";

type TAccordionEditorDrawerProps = {
  blockId: string;
  isOpen: boolean;
  initialTitle?: string;
  onClose: VoidFunction;
  initialData?: null | OutputData;
  onSave: (data?: null | OutputData, title?: string) => void;
};

export const AccordionEditorDrawer: FC<TAccordionEditorDrawerProps> = ({
  blockId,
  isOpen,
  initialData,
  initialTitle = "",
  onClose,
  onSave,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="!bf-h-[90vh] !bf-bg-[#f8f8f8]">
        <DrawerHeader>
          <div className="bf-w-[70%] bf-mx-auto bf-space-y-2">
            <DrawerTitle>Edit Accordion Content</DrawerTitle>
            <DrawerDescription>
              Edit the content of this accordion. You can add text, lists, and
              other elements.
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <AccordionEditor
          onSave={onSave}
          blockId={blockId}
          onClose={onClose}
          initialData={initialData}
          initialTitle={initialTitle}
        />
      </DrawerContent>
    </Drawer>
  );
};
