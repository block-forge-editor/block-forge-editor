import { ToolConstructable } from "@editorjs/editorjs";
import List from "@editorjs/list";

import {
  Paragraph,
  ImageGallery,
  Embed,
  Social,
  Card,
  Timeline,
  Progress,
  Testimonials,
  Header,
  Accordion,
  Code,
  Columns,
  Divider,
  Quote,
  Stats,
  Table,
  Image,
} from "../ui/orgranisms";
import { Excalidraw } from "../ui/orgranisms/excalidraw";

export const CONSTRUCTOR_EDITOR_TOOLS = {
  header: {
    class: Header,
  },
  paragraph: {
    class: Paragraph,
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
  quote: {
    class: Quote,
  },
  code: {
    class: Code,
  },
  embed: {
    class: Embed,
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
  header: CONSTRUCTOR_EDITOR_TOOLS.header,
  paragraph: CONSTRUCTOR_EDITOR_TOOLS.paragraph,
  list: CONSTRUCTOR_EDITOR_TOOLS.list,
  divider: CONSTRUCTOR_EDITOR_TOOLS.divider,
  table: CONSTRUCTOR_EDITOR_TOOLS.table,
};

export const COLUMNS_EDITOR_TOOLS = {
  header: CONSTRUCTOR_EDITOR_TOOLS.header,
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
