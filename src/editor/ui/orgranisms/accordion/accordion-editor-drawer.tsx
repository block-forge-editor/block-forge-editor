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
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
};

export const AccordionEditorDrawer: FC<TAccordionEditorDrawerProps> = ({
  isOpen,
  onClose,
  children,
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

        {children}
      </DrawerContent>
    </Drawer>
  );
};
