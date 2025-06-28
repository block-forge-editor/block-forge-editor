import { EditorConfig } from "@editorjs/editorjs";

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

export const defaultToolConfigs: EditorConfig["tools"] = {
  paragraph: {
    class: undefined,
    config: {
      preserveBlank: false,
    },
  },
  list: {
    class: undefined,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
    toolbox: {
      title: "List",
    },
  },
  table: {
    class: undefined,
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
    class: undefined,
  },
  excalidraw: {
    class: undefined,
  },
  columns: {
    class: undefined,
  },
  imageGallery: {
    class: undefined,
  },
  imageSingle: {
    class: undefined,
  },
  figma: {
    class: undefined,
  },
  quote: {
    class: undefined,
  },
  code: {
    class: undefined,
  },
  videoEmbed: {
    class: undefined,
  },
  social: {
    class: undefined,
  },
  card: {
    class: undefined,
  },
  stats: {
    class: undefined,
  },
  timeline: {
    class: undefined,
  },
  progress: {
    class: undefined,
  },
  testimonials: {
    class: undefined,
  },
  accordion: {
    class: undefined,
  },
};

export const TOOL_PRESETS = {
  full: Object.keys(defaultToolConfigs),
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
  accordion: ["paragraph", "list", "divider", "table"],
  columns: ["paragraph", "list", "divider", "table"],
} as const;

export type TToolPreset = keyof typeof TOOL_PRESETS;
