import List from "@editorjs/list";

import {
  ImageGallery,
  VideoEmbed,
  Social,
  Card,
  Timeline,
  Progress,
  Testimonials,
  Accordion,
  Code,
  Columns,
  Divider,
  Quote,
  Stats,
  Table,
  Image,
  BlockForgeParagraph,
} from "../ui/orgranisms";
import { Excalidraw } from "../ui/orgranisms/excalidraw";
import { Figma } from "../ui/orgranisms/figma";

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
    class: Table,
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
    class: Divider,
  },
  excalidraw: {
    class: Excalidraw,
  },
  columns: {
    class: Columns,
  },
  imageGallery: {
    class: ImageGallery,
  },
  imageSingle: {
    class: Image,
  },
  figma: {
    class: Figma,
  },
  quote: {
    class: Quote,
  },
  code: {
    class: Code,
  },
  videoEmbed: {
    class: VideoEmbed,
  },
  social: {
    class: Social,
  },
  card: {
    class: Card,
  },
  stats: {
    class: Stats,
  },
  timeline: {
    class: Timeline,
  },
  progress: {
    class: Progress,
  },
  testimonials: {
    class: Testimonials,
  },
  accordion: {
    class: Accordion,
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
      type: "header",
      data: {
        level: 1,
        text: "Start adding your content here...",
      },
    },
  ],
};
