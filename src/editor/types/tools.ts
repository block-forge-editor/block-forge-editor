import { TOOL_PRESETS } from "../lib/tools-manager";

export type TToolConfig = {
  class: any;
  config?: Record<string, any>;
  inlineToolbar?: boolean;
  toolbox?: {
    title: string;
    icon?: string;
  };
};

export type TToolsRegistry = Record<string, TToolConfig>;
