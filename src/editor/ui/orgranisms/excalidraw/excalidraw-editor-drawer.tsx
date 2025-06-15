import { FC } from "react";

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
  isOpen: boolean;
  onClose: VoidFunction;
  onSave: VoidFunction;
  children: React.ReactNode;
};

export const ExcalidrawEditorDrawer: FC<TExcalidrawEditorDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  children,
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

        {children}

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
