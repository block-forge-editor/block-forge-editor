import { FC } from "react";

import { OutputData } from "@editorjs/editorjs";

import { ColumnEditor } from "./column-editor";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerDescription,
} from "@/editor/ui/shadcn/ui/drawer";

type TColumnEditorDrawerProps = {
  isOpen: boolean;
  blockId: string;
  onClose: () => void;
  initialData?: null | OutputData;
  onSave: (data: OutputData) => void;
};

export const ColumnEditorDrawer: FC<TColumnEditorDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  blockId,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="!bf-h-[90vh] !bf-bg-[#f8f8f8]">
        <DrawerHeader>
          <div className="bf-w-full sm:bf-w-[70%] bf-mx-auto bf-space-y-2">
            <DrawerTitle>Edit Column Content</DrawerTitle>
            <DrawerDescription>
              Edit the content of this column. You can add text, lists, and
              other elements.
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <ColumnEditor
          onSave={onSave}
          blockId={blockId}
          onClose={onClose}
          initialData={initialData}
        />
      </DrawerContent>
    </Drawer>
  );
};
