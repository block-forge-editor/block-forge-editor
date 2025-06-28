import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";

import {
  Save,
  HelpCircle,
  Palette,
  Type,
  Circle,
  Settings,
  Loader,
} from "lucide-react";

import { DEFAULT_INITIAL_DATA, TToolPreset } from "./lib/tools-constants";
import { useEditor } from "./lib/use-editor";

import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarContent,
  MenubarTrigger,
  // MenubarShortcut,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/editor/ui/shadcn/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/editor/ui/shadcn/ui/dialog";
import "../globals.css";

import { PASTEL_COLORS } from "./lib/colors-constants";
import { TBlockForgeEditorProps } from "./types/common";

export const BlockForgeEditor: FC<TBlockForgeEditorProps<TToolPreset>> = ({
  initialData,
  onCancel,
  onSave,
  onChange,
  tools,
  id,
  toolPreset,
  enabledTools,
}) => {
  const [selectedFont, setSelectedFont] = useState<string | undefined>(
    initialData?.meta?.font ?? "opensans",
  );
  const [selectedBg, setSelectedBg] = useState<string | undefined>(
    initialData?.meta?.background ?? "white",
  );
  const [showAbout, setShowAbout] = useState(false);

  const { ejInstance, isLoading } = useEditor({
    tools,
    id: `editorjs-${id}`,
    initialData: initialData ?? DEFAULT_INITIAL_DATA,
    toolPreset,
    enabledTools,
    onChange: (data) => {
      onChange?.({
        ...data,
        meta,
      });
    },
  });

  const meta = useMemo(() => {
    return {
      font: selectedFont,
      background: selectedBg,
    };
  }, [selectedFont, selectedBg]);
  const editorStyle = useMemo(() => {
    let fontClass: string | undefined;
    if (selectedFont === "arial") fontClass = "bf-font-arial";
    if (selectedFont === "times") fontClass = "bf-font-times";
    if (selectedFont === "roboto") fontClass = "bf-font-roboto";
    if (selectedFont === "opensans") fontClass = "bf-font-opensans";

    const selectedColor = PASTEL_COLORS.find(
      (color) => color.value === selectedBg,
    );
    return {
      fontClass,
      bgClass: selectedColor?.bgClass || "bf-bg-white",
    };
  }, [selectedFont, selectedBg]);

  const handleSubmit = useCallback(async () => {
    const content = await ejInstance.current?.save();

    if (!content) {
      onSave?.({
        blocks: [],
        meta,
      });
      return;
    }

    onSave?.({
      ...(content ?? {}),
      meta,
    });
  }, [ejInstance, onSave, selectedFont, selectedBg]);

  const toggleAbout = useCallback(() => {
    setShowAbout((prev) => !prev);
  }, []);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  return (
    <div className="bf-flex bf-flex-col bf-space-y-4 bf-my-6 bf-px-1">
      <Menubar className="bf-rounded-lg bf-border-none bf-mx-auto bf-shadow-sm bf-w-full sm:bf-w-[70%]">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleSubmit}>
              <Save className="bf-mr-2 bf-h-4 bf-w-4" />
              Save
              {/* <MenubarShortcut>⌘S</MenubarShortcut> */}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleCancel}>Exit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>
            <Settings className="bf-mr-2 bf-h-4 bf-w-4" /> Settings
          </MenubarTrigger>
          <MenubarContent className="bf-w-56">
            <MenubarSub>
              <MenubarSubTrigger>
                <Type className="bf-mr-2 bf-h-4 bf-w-4" />
                Font
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => setSelectedFont("arial")}
                  className={selectedFont === "arial" ? "bf-bg-accent" : ""}
                >
                  Arial
                </MenubarItem>
                <MenubarItem
                  onClick={() => setSelectedFont("times")}
                  className={selectedFont === "times" ? "bf-bg-accent" : ""}
                >
                  Times New Roman
                </MenubarItem>
                <MenubarItem
                  onClick={() => setSelectedFont("roboto")}
                  className={selectedFont === "roboto" ? "bf-bg-accent" : ""}
                >
                  Roboto
                </MenubarItem>
                <MenubarItem
                  onClick={() => setSelectedFont("opensans")}
                  className={selectedFont === "opensans" ? "bf-bg-accent" : ""}
                >
                  Open Sans
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSeparator />

            <MenubarSub>
              <MenubarSubTrigger>
                <Palette className="bf-mr-2 bf-h-4 bf-w-4" />
                Background
              </MenubarSubTrigger>
              <MenubarSubContent>
                {PASTEL_COLORS.map((color) => (
                  <MenubarItem
                    key={color.value}
                    onClick={() => setSelectedBg(color.value)}
                    className={`bf-flex bf-items-center bf-gap-2 ${
                      selectedBg === color.value ? "bf-bg-accent" : ""
                    }`}
                  >
                    <Circle className={`bf-w-4 bf-h-4 ${color.strokeClass}`} />
                    {color.label}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
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

      {isLoading && (
        <div className="bf-fixed bf-inset-0 bf-flex bf-items-center bf-justify-center bf-bg-white/80 bf-z-50">
          <div className="bf-text-center">
            <Loader className="bf-animate-spin bf-mx-auto" />
            <p className="bf-mt-2 bf-text-gray-600">Loading editor tools...</p>
          </div>
        </div>
      )}

      <div
        className={`bf-mx-auto bf-m-8 bf-min-h-screen bf-overflow-auto bf-shadow-md bf-rounded-lg bf-w-full sm:bf-w-[70%] ${editorStyle.bgClass} ${editorStyle.fontClass}`}
      >
        <div id={`editorjs-${id}`} />
      </div>
    </div>
  );
};
