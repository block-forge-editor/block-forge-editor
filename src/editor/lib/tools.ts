import List from "@editorjs/list";

import {
  BlockForgeImageGallery,
  BlockForgeVideoEmbed,
  BlockForgeSocial,
  BlockForgeCard,
  BlockForgeTimeline,
  BlockForgeProgress,
  BlockForgeTestimonials,
  BlockForgeAccordion,
  BlockForgeCode,
  BlockForgeColumns,
  BlockForgeDivider,
  BlockForgeQuote,
  BlockForgeStats,
  BlockForgeTable,
  BlockForgeImage,
  BlockForgeParagraph,
  BlockForgeExcalidraw,
  BlockForgeFigma,
} from "../ui/orgranisms";

export const CONSTRUCTOR_EDITOR_TOOLS = {
  paragraph: {
    class: BlockForgeParagraph,
    config: {
      preserveBlank: false,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
    toolbox: {
      title: "List",
    },
  },
  table: {
    class: BlockForgeTable,
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
    class: BlockForgeDivider,
  },
  excalidraw: {
    class: BlockForgeExcalidraw,
  },
  columns: {
    class: BlockForgeColumns,
  },
  imageGallery: {
    class: BlockForgeImageGallery,
  },
  imageSingle: {
    class: BlockForgeImage,
  },
  figma: {
    class: BlockForgeFigma,
  },
  quote: {
    class: BlockForgeQuote,
  },
  code: {
    class: BlockForgeCode,
  },
  videoEmbed: {
    class: BlockForgeVideoEmbed,
  },
  social: {
    class: BlockForgeSocial,
  },
  card: {
    class: BlockForgeCard,
  },
  stats: {
    class: BlockForgeStats,
  },
  timeline: {
    class: BlockForgeTimeline,
  },
  progress: {
    class: BlockForgeProgress,
  },
  testimonials: {
    class: BlockForgeTestimonials,
  },
  accordion: {
    class: BlockForgeAccordion,
  },
};

export const ACCORDION_EDITOR_TOOLS = {
  paragraph: CONSTRUCTOR_EDITOR_TOOLS.paragraph,
  list: CONSTRUCTOR_EDITOR_TOOLS.list,
  divider: CONSTRUCTOR_EDITOR_TOOLS.divider,
  table: CONSTRUCTOR_EDITOR_TOOLS.table,
};

export const COLUMNS_EDITOR_TOOLS = {
  paragraph: CONSTRUCTOR_EDITOR_TOOLS.paragraph,
  list: CONSTRUCTOR_EDITOR_TOOLS.list,
  divider: CONSTRUCTOR_EDITOR_TOOLS.divider,
  table: CONSTRUCTOR_EDITOR_TOOLS.table,
};

export const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      id: "0",
      type: "paragraph",
      data: {
        level: 1,
        text: "Start adding your content here...",
      },
    },
  ],
};
