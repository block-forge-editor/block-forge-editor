import { ToolConstructable } from "@editorjs/editorjs";
import List from "@editorjs/list";

import { Accordion } from "@/entities/editor-components/accordion";
import { Columns } from "@/entities/editor-components/columns";
import { CustomDelimiter } from "@/entities/editor-components/custom-divider";
import { CustomHeader } from "@/entities/editor-components/custom-header";
import { CustomParagraph } from "@/entities/editor-components/custom-paragraph";
import { CustomTable } from "@/entities/editor-components/custom-table";
import { Link } from "@/entities/editor-components/link";
import { YouTubeLink } from "@/entities/editor-components/youtube-link";
import { AlignmentInlineTool } from "@/entities/editor-tools/alignment-tool";

export const CONSTRUCTOR_EDITOR_TOOLS = {
  header: {
    class: CustomHeader as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  // TODO: deprecated subtitle component
  subtitle: {
    class: CustomParagraph as unknown as ToolConstructable,
    inlineToolbar: true,
    toolbox: {
      title: "Подзаголовок",
    },
  },
  paragraph: {
    class: CustomParagraph as unknown as ToolConstructable,
    toolbox: {
      title: "Текст",
    },
    config: {
      placeholder: "Введите текст",
      preserveBlank: true,
    },
  },
  customLink: {
    class: Link as unknown as ToolConstructable,
  },
  youtubeLink: {
    class: YouTubeLink as unknown as ToolConstructable,
  },
  list: {
    class: List as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
    toolbox: {
      title: "Список",
    },
  },
  table: {
    class: CustomTable as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
    toolbox: {
      title: "Таблица",
    },
  },
  delimiter: {
    class: CustomDelimiter as unknown as ToolConstructable,
    toolbox: {
      title: "Разделитель",
    },
  },
  alignment: {
    class: AlignmentInlineTool as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  columns: {
    class: Columns as unknown as ToolConstructable,
  },
  accordion: {
    class: Accordion as unknown as ToolConstructable,
  },
};

export const ACCORDION_EDITOR_TOOLS = {
  header: CONSTRUCTOR_EDITOR_TOOLS.header,
  subtitle: CONSTRUCTOR_EDITOR_TOOLS.subtitle,
  paragraph: CONSTRUCTOR_EDITOR_TOOLS.paragraph,
  customLink: CONSTRUCTOR_EDITOR_TOOLS.customLink,
  list: CONSTRUCTOR_EDITOR_TOOLS.list,
  delimiter: CONSTRUCTOR_EDITOR_TOOLS.delimiter,
  table: CONSTRUCTOR_EDITOR_TOOLS.table,
  alignment: CONSTRUCTOR_EDITOR_TOOLS.alignment,
};

export const COLUMNS_EDITOR_TOOLS = {
  header: CONSTRUCTOR_EDITOR_TOOLS.header,
  subtitle: CONSTRUCTOR_EDITOR_TOOLS.subtitle,
  paragraph: CONSTRUCTOR_EDITOR_TOOLS.paragraph,
  customLink: CONSTRUCTOR_EDITOR_TOOLS.customLink,
  list: CONSTRUCTOR_EDITOR_TOOLS.list,
  delimiter: CONSTRUCTOR_EDITOR_TOOLS.delimiter,
  alignment: CONSTRUCTOR_EDITOR_TOOLS.alignment,
};
