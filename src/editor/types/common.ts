import { OutputData, EditorConfig } from "@editorjs/editorjs";

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
};
