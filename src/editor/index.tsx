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
  const [showAbout, setShowAbout] = useState(false);

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

  const toggleAbout = useCallback(() => {
    setShowAbout((prev) => !prev);
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
            <MenubarItem onClick={toggleAbout}>
              <HelpCircle className="bf-mr-2 bf-h-4 bf-w-4" />
              About Editor
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="bf-fixed bf-top-[50%] bf-left-[50%] bf-translate-x-[-50%] bf-translate-y-[-50%]">
          <DialogHeader>
            <DialogTitle className="bf-text-center">
              About Block Forge
            </DialogTitle>
          </DialogHeader>
          <div className="bf-text-center bf-py-4">
            <p className="bf-text-gray-600 bf-mb-2">
              A powerful article builder based on EditorJS
            </p>
            <p className="bf-text-sm bf-text-gray-500">
              Built with React, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bf-mx-auto bf-m-8 bf-min-h-screen bf-overflow-auto bf-shadow-md bf-rounded-lg bf-w-[70%] bf-bg-white">
        <div id={`editorjs-${id}`} />
      </div>
    </div>
  );
};
