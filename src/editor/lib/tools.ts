import type { EditorConfig } from "@editorjs/editorjs";
import { createToolsConfig, TOOL_PRESETS, TToolPreset } from "./tools-manager";
import { TToolsRegistry } from "../types/tools";

export { TOOL_PRESETS };

export const CONSTRUCTOR_EDITOR_TOOLS = {} as EditorConfig["tools"];
export const ACCORDION_EDITOR_TOOLS = {} as EditorConfig["tools"];
export const COLUMNS_EDITOR_TOOLS = {} as EditorConfig["tools"];

export async function getToolsConfig(
  preset?: TToolPreset,
  enabledTools?: string[],
  customTools?: TToolsRegistry,
): Promise<EditorConfig["tools"]> {
  let toolsToEnable: readonly string[];

  if (preset && TOOL_PRESETS[preset]) {
    toolsToEnable = TOOL_PRESETS[preset];
  } else if (enabledTools) {
    toolsToEnable = enabledTools;
  } else {
    toolsToEnable = TOOL_PRESETS.full;
  }

  return createToolsConfig([...toolsToEnable], customTools);
}

export function getToolPreset(presetName: TToolPreset): string[] {
  const preset = TOOL_PRESETS[presetName];
  return preset ? [...preset] : [];
}

export function getAllAvailableTools(): string[] {
  return [...TOOL_PRESETS.full];
}

export const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      id: "0",
      type: "paragraph",
      data: {
        text: "Start adding your content here...",
      },
    },
  ],
};
