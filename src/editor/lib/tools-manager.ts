import type { EditorConfig } from "@editorjs/editorjs";
import { TToolsRegistry } from "../types/tools";

export const lazyTools = {
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

export const defaultToolConfigs: TToolsRegistry = {
  paragraph: {
    class: null,
    config: {
      preserveBlank: false,
    },
  },
  list: {
    class: null,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
    toolbox: {
      title: "List",
    },
  },
  table: {
    class: null,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
    toolbox: {
      title: "Table",
    },
  },
  divider: {
    class: null,
  },
  excalidraw: {
    class: null,
  },
  columns: {
    class: null,
  },
  imageGallery: {
    class: null,
  },
  imageSingle: {
    class: null,
  },
  figma: {
    class: null,
  },
  quote: {
    class: null,
  },
  code: {
    class: null,
  },
  videoEmbed: {
    class: null,
  },
  social: {
    class: null,
  },
  card: {
    class: null,
  },
  stats: {
    class: null,
  },
  timeline: {
    class: null,
  },
  progress: {
    class: null,
  },
  testimonials: {
    class: null,
  },
  accordion: {
    class: null,
  },
};

const loadedTools = new Map<string, any>();

export async function loadTool(toolName: string): Promise<any> {
  if (loadedTools.has(toolName)) {
    return loadedTools.get(toolName);
  }

  const lazyLoader = lazyTools[toolName as keyof typeof lazyTools];
  if (!lazyLoader) {
    throw new Error(`Tool "${toolName}" not found in lazy tools registry`);
  }

  try {
    const toolClass = await lazyLoader();
    loadedTools.set(toolName, toolClass);
    return toolClass;
  } catch (error) {
    console.error(`Failed to load tool "${toolName}":`, error);
    throw error;
  }
}

export async function createToolsConfig(
  enabledTools: string[] = Object.keys(defaultToolConfigs),
  customTools: TToolsRegistry = {},
): Promise<EditorConfig["tools"]> {
  const toolsConfig: EditorConfig["tools"] = {};

  for (const [toolName, toolConfig] of Object.entries(customTools)) {
    toolsConfig[toolName] = toolConfig;
  }

  for (const toolName of enabledTools) {
    if (toolsConfig[toolName]) {
      continue;
    }

    const defaultConfig = defaultToolConfigs[toolName];
    if (!defaultConfig) {
      console.warn(`Tool "${toolName}" not found in default configs`);
      continue;
    }

    try {
      const toolClass = await loadTool(toolName);
      toolsConfig[toolName] = {
        ...defaultConfig,
        class: toolClass,
      };
    } catch (error) {
      console.error(`Failed to load tool "${toolName}":`, error);
    }
  }

  return toolsConfig;
}

export const TOOL_PRESETS = {
  minimal: ["paragraph", "list", "divider"],

  basic: ["paragraph", "list", "table", "divider", "quote", "code"],

  media: [
    "paragraph",
    "list",
    "imageSingle",
    "imageGallery",
    "videoEmbed",
    "figma",
  ],

  full: Object.keys(defaultToolConfigs),

  accordion: ["paragraph", "list", "divider", "table"],

  columns: ["paragraph", "list", "divider", "table"],
} as const;

export type TToolPreset = keyof typeof TOOL_PRESETS;
