export type {
  TBlockForgeEditorProps,
  TCustomData,
  TEditorLayout,
} from "./editor/types/common";
export type { TTheme, TResolvedTheme } from "./editor/lib/theme";
export type { TToolPreset } from "./editor/lib/tools-constants";
export { TOOL_PRESETS } from "./editor/lib/tools-constants";

export { getToolsConfig } from "./editor/lib/tools-manager";
export { BlockForgeEditor } from "./editor";
