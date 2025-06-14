import { FC } from "react";

import { ExcalidrawEditor } from "./excalidraw-editor";
import { TExcalidrawData } from "./types";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
} from "@/editor/ui/shadcn/ui/drawer";
import { Button, DrawerClose } from "@/editor/ui/shadcn";

type TExcalidrawEditorDrawerProps = {
  blockId: string;
  isOpen: boolean;
  onClose: VoidFunction;
  initialData?: TExcalidrawData;
  onSave: VoidFunction;
  onUpdate: (data: TExcalidrawData) => void;
};

export const ExcalidrawEditorDrawer: FC<TExcalidrawEditorDrawerProps> = ({
  blockId,
  isOpen,
  initialData,
  onClose,
  onSave,
  onUpdate,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="!bf-h-[90vh] !bf-bg-[#f8f8f8]">
        <DrawerHeader>
          <div className="bf-w-[70%] bf-mx-auto bf-space-y-2">
            <DrawerTitle>Edit Drawing</DrawerTitle>
            <DrawerDescription>
              Create and edit your drawing using the Excalidraw editor.
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <ExcalidrawEditor
          blockId={blockId}
          initialData={initialData}
          onUpdate={onUpdate}
        />

        <DrawerFooter>
          <div className="bf-flex bf-mx-auto bf-w-[70%] bf-justify-end bf-gap-2">
            <DrawerClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DrawerClose>
            <Button onClick={onSave}>Save Changes</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
