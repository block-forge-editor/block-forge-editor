import type { FC } from "react";
import { useId, useCallback, useState } from "react";

import { EditorConfig, OutputData } from "@editorjs/editorjs";
import { Save, HelpCircle } from "lucide-react";

import { CONSTRUCTOR_EDITOR_TOOLS } from "./lib/tools";
import { useEditor } from "./lib/use-editor";

import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarContent,
  MenubarTrigger,
  // MenubarShortcut,
  MenubarSeparator,
} from "@/editor/ui/shadcn/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/editor/ui/shadcn/ui/dialog";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      id: "0",
      type: "header",
      data: {
        level: 1,
        text: "Start adding your content here...",
      },
    },
  ],
};

type TProps = {
  onCancel?: VoidFunction;
  initialData?: null | OutputData;
  onSave?: (data?: OutputData) => void;
  onChange?: (data?: OutputData) => void;
  tools?: EditorConfig["tools"];
};

export const BlockForgeEditor: FC<TProps> = ({
  initialData,
  onCancel,
  onSave,
  onChange,
  tools,
}) => {
  const id = useId();
  const [showPetuch, setShowPetuch] = useState(false);

  const ejInstance = useEditor({
    tools: {
      ...(CONSTRUCTOR_EDITOR_TOOLS as unknown as EditorConfig["tools"]),
      ...tools,
    },
    id: `editorjs-${id}`,
    initialData: initialData ?? DEFAULT_INITIAL_DATA,
    onChange,
  });

  const handleSubmit = useCallback(async () => {
    const content = await ejInstance.current?.save();

    onSave?.(content);
  }, [ejInstance, onSave]);

  const togglePetuch = useCallback(() => {
    setShowPetuch((prev) => !prev);
  }, []);

  return (
    <div className="bf-flex bf-flex-col bf-space-y-4 bf-my-6 bf-px-1">
      <Menubar className="bf-rounded-lg bf-border-none bf-mx-auto bf-shadow-sm bf-w-[70%]">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => void handleSubmit()}>
              <Save className="bf-mr-2 bf-h-4 bf-w-4" />
              Save
              {/* <MenubarShortcut>⌘S</MenubarShortcut> */}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={onCancel}>Exit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={togglePetuch}>
              <HelpCircle className="bf-mr-2 bf-h-4 bf-w-4" />
              About Editor
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Dialog open={showPetuch} onOpenChange={setShowPetuch}>
        <DialogContent className="bf-fixed bf-top-[50%] bf-left-[50%] bf-translate-x-[-50%] bf-translate-y-[-50%]">
          <DialogHeader>
            <DialogTitle className="bf-text-center">
              Petuch Easter Egg!
            </DialogTitle>
          </DialogHeader>
          <div className="bf-text-center bf-py-4">
            <div className="bf-animate-bounce bf-text-6xl bf-mb-4">🐓</div>
            <p className="bf-text-gray-600">You found me! 🎉</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bf-mx-auto bf-m-8 bf-min-h-screen bf-overflow-auto bf-shadow-md bf-rounded-lg bf-w-[70%] bf-bg-white">
        <div id={`editorjs-${id}`} />
      </div>
    </div>
  );
};
