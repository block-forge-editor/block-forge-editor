import { OutputData, EditorConfig } from "@editorjs/editorjs";

import type { TTheme } from "../lib/theme";

// page: a centred sheet with a shadow, for a full page editor (default).
// embedded: fills its container, no margins, shadow or background of its own.
export type TEditorLayout = "page" | "embedded";

export type TCustomData = {
  meta?: {
    font?: string;
    background?: string;
  };
};

// TOOLS - OVERRIDE ALL TOOLS
// TOOLS PRESET - STRING KEY OF TOOL_PRESETS FOR DEFAULT TOOLS
// ENABLED TOOLS - STRING ARRAY OF TOOLS TO ENABLE (ALTERNATIVE TOOLS PRESET)
export type TBlockForgeEditorProps<T> = {
  onCancel?: VoidFunction;
  initialData?: null | (OutputData & TCustomData);
  onSave?: (data?: OutputData & TCustomData) => void;
  onChange?: (data?: OutputData & TCustomData) => void;
  tools?: EditorConfig["tools"];
  id: string;
  toolPreset?: T;
  enabledTools?: string[];
  theme?: TTheme;
  layout?: TEditorLayout;
  showMenubar?: boolean;
  className?: string;
};
