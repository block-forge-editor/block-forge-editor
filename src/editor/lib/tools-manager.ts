import type { EditorConfig } from "@editorjs/editorjs";
import {
  TOOL_PRESETS,
  TToolPreset,
  defaultToolConfigs,
} from "./tools-constants";

export async function getToolsConfig(
  preset?: TToolPreset,
  enabledTools?: string[],
  customTools?: EditorConfig["tools"],
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

const lazyTools = {
  list: () => import("@editorjs/list").then((module) => module.default),

  paragraph: () =>
    import("../ui/orgranisms/paragraph").then(
      (module) => module.BlockForgeParagraph,
    ),
  table: () =>
    import("../ui/orgranisms/table").then((module) => module.BlockForgeTable),
  divider: () =>
    import("../ui/orgranisms/divider").then(
      (module) => module.BlockForgeDivider,
    ),
  excalidraw: () =>
    import("../ui/orgranisms/excalidraw").then(
      (module) => module.BlockForgeExcalidraw,
    ),
  columns: () =>
    import("../ui/orgranisms/columns").then(
      (module) => module.BlockForgeColumns,
    ),
  imageGallery: () =>
    import("../ui/orgranisms/image-gallery").then(
      (module) => module.BlockForgeImageGallery,
    ),
  imageSingle: () =>
    import("../ui/orgranisms/image").then((module) => module.BlockForgeImage),
  figma: () =>
    import("../ui/orgranisms/figma").then((module) => module.BlockForgeFigma),
  quote: () =>
    import("../ui/orgranisms/quote").then((module) => module.BlockForgeQuote),
  code: () =>
    import("../ui/orgranisms/code").then((module) => module.BlockForgeCode),
  videoEmbed: () =>
    import("../ui/orgranisms/video-embed").then(
      (module) => module.BlockForgeVideoEmbed,
    ),
  social: () =>
    import("../ui/orgranisms/social").then((module) => module.BlockForgeSocial),
  card: () =>
    import("../ui/orgranisms/card").then((module) => module.BlockForgeCard),
  stats: () =>
    import("../ui/orgranisms/stats").then((module) => module.BlockForgeStats),
  timeline: () =>
    import("../ui/orgranisms/timeline").then(
      (module) => module.BlockForgeTimeline,
    ),
  progress: () =>
    import("../ui/orgranisms/progress").then(
      (module) => module.BlockForgeProgress,
    ),
  testimonials: () =>
    import("../ui/orgranisms/testimonials").then(
      (module) => module.BlockForgeTestimonials,
    ),
  accordion: () =>
    import("../ui/orgranisms/accordion").then(
      (module) => module.BlockForgeAccordion,
    ),
};

function createToolLoader() {
  const loadedTools = new Map<string, any>();

  return async function loadTool(toolName: string): Promise<any> {
    if (loadedTools.has(toolName)) {
      return loadedTools.get(toolName);
    }

    const lazyLoader = lazyTools[toolName as keyof typeof lazyTools];
    if (!lazyLoader) {
      throw new Error(
        `Tool "${toolName}" not found in lazy tools registry in Block Forge`,
      );
    }

    try {
      const toolClass = await lazyLoader();
      loadedTools.set(toolName, toolClass);
      return toolClass;
    } catch (error) {
      console.error(`Failed to load tool "${toolName}" in Block Forge:`, error);
      throw error;
    }
  };
}

async function createToolsConfig(
  enabledTools: string[] = Object.keys(defaultToolConfigs || {}),
  customTools: EditorConfig["tools"] = {},
): Promise<EditorConfig["tools"]> {
  const loadTool = createToolLoader();
  const toolsConfig: EditorConfig["tools"] = {};

  for (const [toolName, toolConfig] of Object.entries(customTools)) {
    toolsConfig[toolName] = toolConfig;
  }

  for (const toolName of enabledTools) {
    if (toolsConfig[toolName]) {
      continue;
    }

    const defaultConfig = defaultToolConfigs?.[toolName];
    if (!defaultConfig) {
      console.warn(
        `Tool "${toolName}" not found in default configs in Block Forge`,
      );
      continue;
    }

    try {
      const toolClass = await loadTool(toolName);
      toolsConfig[toolName] = {
        ...defaultConfig,
        class: toolClass,
      };
    } catch (error) {
      console.error(`Failed to load tool "${toolName}" in Block Forge:`, error);
    }
  }

  return toolsConfig;
}
