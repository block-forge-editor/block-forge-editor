# Block Forge

[![](https://img.shields.io/npm/v/%40block-forge%2Fblock-forge-editor)](https://www.npmjs.com/package/@block-forge/block-forge-editor)
[![](https://img.shields.io/github/stars/block-forge-editor)](https://github.com/block-forge-editor/block-forge-editor)
[![](https://img.shields.io/badge/demo-site-blue)](https://block-forge-editor-demo.vercel.app/)
[![](https://img.shields.io/npm/dw/%40block-forge%2Fblock-forge-editor)](https://www.npmjs.com/package/@block-forge/block-forge-editor)

A powerful article builder for React based on EditorJS and built with shadcn/ui and Tailwind CSS. Create beautiful, structured content with a modern block-based editor.

## Features

- 🔌 Based on [EditorJS](https://editorjs.io/)
- 🎨 All-in-one block-based editing experience
- 🚀 Modern UI components built with React, Tailwind CSS, shadcn/ui
- 📦 Easy to integrate - no additional configuration needed

## Installation

```bash
npm i @block-forge/block-forge-editor
# or
yarn add @block-forge/block-forge-editor
# or
pnpm add @block-forge/block-forge-editor
```

## Requirements

- React 18 or higher

## Usage

```jsx
import { BlockForgeEditor } from "@block-forge/block-forge-editor";
import "@block-forge/block-forge-editor/dist/index.css";

function App() {
  return (
    <BlockForgeEditor
      data={initialData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      tools={[...array of your editor js tools]}
      theme="light" // "light" | "dark" | "system"
      layout="page" // "page" | "embedded"
      showMenubar // false hides File / Settings / Help
    />
  );
}
```

## Theme

`theme` switches the editor between `"light"` (default), `"dark"` and `"system"` (follows `prefers-color-scheme` and its changes):

```jsx
<BlockForgeEditor id="my-editor" theme="dark" />
```

Dark styles are scoped to the `.bf-dark` class the editor sets on its own root, so the host page's `.dark` class or
styles are never affected. Menus, dialogs and drawers rendered in portals get the same theme automatically.

Every colour comes from CSS variables (shadcn/ui tokens, HSL channels without `hsl()`), including EditorJS's own toolbar
and popovers. Override them to match your app:

```css
.bf-dark {
  --background: 0 0% 15%;
  --foreground: 0 0% 100%;
  --popover: 0 0% 11%;
  --popover-foreground: 0 0% 100%;
  --muted: 0 0% 20%;
  --muted-foreground: 0 0% 64%;
  --accent: 0 0% 22%;
  --accent-foreground: 0 0% 100%;
  --border: 0 0% 25%;
  --input: 0 0% 32%;
  --primary: 49 100% 80%;
  --primary-foreground: 0 0% 15%;
  --ring: 49 100% 80%;
}
```

Light values live on `:root`, dark values on `.bf-dark`; see `src/globals.css` for the full list.

## Embedding into an app

By default (`layout="page"`) the editor renders a centred sheet with a shadow and a menubar, which suits a full-page
editor. Inside an existing form use `layout="embedded"`: the editor fills its container, has no margins, shadow,
background or font of its own (it inherits the host's), and a compact top padding. Hide the menubar with
`showMenubar={false}` when your app has its own Save / Cancel buttons:

```jsx
<BlockForgeEditor
  id="post-body"
  layout="embedded"
  showMenubar={false}
  theme="dark"
  className="my-editor"
  onChange={handleChange}
/>
```

Fine-tune the embedded layout with CSS variables on the editor or any parent:

| Variable                     | Default | Purpose                                                           |
| ---------------------------- | ------- | ----------------------------------------------------------------- |
| `--bf-editor-gutter`         | `56px`  | Room left of the blocks for the + and drag buttons (desktop only) |
| `--bf-editor-padding-top`    | `8px`   | Space above the first block                                       |
| `--bf-editor-padding-bottom` | `48px`  | Clickable space below the last block                              |
| `--bf-editor-min-height`     | `12rem` | Minimum height of the editing area                                |

## Component Control (components will load async)

### Using Tool Presets

The easiest way to control components is using predefined tool presets:

```jsx
import {
  BlockForgeEditor,
  TOOL_PRESETS,
} from "@block-forge/block-forge-editor";

function App() {
  return (
    <BlockForgeEditor
      id="my-editor"
      toolPreset="basic" // Use a predefined preset
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}
```

#### Available Tool Presets

- **`full`** - All available components (default)
- **`minimal`** - Basic text editing: paragraph, list, divider
- **`basic`** - Common components: paragraph, list, table, divider, quote, code
- **`media`** - Media-focused: paragraph, list, imageSingle, imageGallery, videoEmbed, figma
- **`accordion`** - For accordion content: paragraph, list, divider, table
- **`columns`** - For column layouts: paragraph, list, divider, table

### Using Enabled Tools

For more granular control, you can specify exactly which tools to enable:

```jsx
import { BlockForgeEditor } from "@block-forge/block-forge-editor";

function App() {
  return (
    <BlockForgeEditor
      id="my-editor"
      enabledTools={["paragraph", "list", "imageSingle", "quote", "timeline"]}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}
```

### Available Components

The following components can be enabled via `enabledTools`:

- **`paragraph`** - Text paragraphs with formatting
- **`list`** - Ordered and unordered lists
- **`table`** - Data tables with headers
- **`divider`** - Visual separators
- **`excalidraw`** - Drawing and diagrams
- **`columns`** - Multi-column layouts
- **`imageGallery`** - Image galleries
- **`imageSingle`** - Single image blocks
- **`figma`** - Figma embed blocks
- **`quote`** - Quote blocks with attribution
- **`code`** - Code blocks with syntax highlighting
- **`videoEmbed`** - Video embeds (YouTube, Vimeo, etc.)
- **`social`** - Social media links
- **`card`** - Card components
- **`stats`** - Statistics/metrics displays
- **`timeline`** - Timeline components
- **`progress`** - Progress bars and indicators
- **`testimonials`** - Testimonial blocks
- **`accordion`** - Collapsible accordion sections

### Tools configuration

You can provide tools using tools prop which will override any default tool with same name:

```jsx
import { BlockForgeEditor } from "@block-forge/block-forge-editor";

function App() {
  const tools = [
    {
      paragraph: {
        class: MyCustomParagraphTool,
        config: {
          preserveBlank: true,
        },
      },
    },
  ];

  return (
    <BlockForgeEditor
      id="my-editor"
      tools={tools}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}
```

## Data Structure

The editor saves data in EditorJS format. Here's an example of the saved data structure:

```typescript
type EditorData = {
  time: number;
  blocks: Array<{
    id: string;
    type: string;
    data: any;
  }>;
  version: string;
  meta?: {
    font?: string;
    background?: string;
    [key: string]: any;
  };
};
```

### Example Saved Data

```json
{
  "time": 1750583863555,
  "blocks": [
    {
      "id": "4k-k_4z4uf",
      "type": "paragraph",
      "data": {
        "text": "<b>Block Forge Editor Demo</b>",
        "fontSize": 20,
        "tag": "h1"
      }
    },
    {
      "id": "P7pzcUmYw1",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          { "content": "Item 1", "meta": {}, "items": [] },
          { "content": "Item 2", "meta": {}, "items": [] }
        ]
      }
    },
    {
      "id": "5CxpNLMX0W",
      "type": "table",
      "data": {
        "withHeadings": true,
        "content": [
          ["Header 1", "Header 2"],
          ["Cell 1", "Cell 2"]
        ]
      }
    }
  ],
  "version": "2.31.0-rc.7",
  "meta": {
    "font": "times",
    "background": "emerald-50"
  }
}
```

### onChange Handler

```jsx
const handleChange = (data: EditorData) => {
  console.log('Editor data changed:', data);
  // Save to your backend or state management
};
```

### onSave Handler

```jsx
const handleSave = async (data: EditorData) => {
   console.log('Editor data changed:', data);
};
```

### onCancel Handler

````jsx
const handleCancel = () => {
   console.log('Edit cancelled')
}

## Available Blocks

This document provides a comprehensive overview of the saved data structure for each component.

### AccordionEditor

```typescript
type TAccordionData = {
  title: string;
  data: OutputData | null;
};
````

### ColumnEditor

```typescript
type TColumnData = {
  data: OutputData;
};
```

### Paragraph

```typescript
type TParagraphData = {
  text: string;
  fontSize?: number;
};
```

### Header

```typescript
type THeaderData = {
  text: string;
  level: number;
  fontSize: number;
};
```

### Embed

```typescript
type TEmbedData = {
  url: string;
  variant: "primary" | "secondary";
  platform: "vimeo" | "other" | "youtube";
};
```

### Divider

```typescript
type TDividerData = {
  color?: string;
};
```

### Timeline

```typescript
type TTimelineData = {
  variant: "primary" | "secondary";
  events: Array<{
    date: string;
    title: string;
    description: string;
  }>;
};
```

### Testimonials

```typescript
type TTestimonialsData = {
  variant: "primary" | "secondary";
  items: Array<{
    name: string;
    role: string;
    text: string;
    photo: string;
  }>;
};
```

### Stats

```typescript
type TStatsData = {
  variant: "primary" | "secondary";
  items: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
};
```

### Social

```typescript
type TSocialData = {
  variant: "primary" | "secondary";
  links: Array<{
    url: string;
    platform: string;
  }>;
};
```

### Quote

```typescript
type TQuoteData = {
  text: string;
  author?: string;
  source?: string;
  variant: "primary" | "secondary";
};
```

### Progress

```typescript
type TProgressData = {
  variant: "primary" | "secondary";
  items: Array<{
    label: string;
    value: number;
  }>;
};
```

### Table

The Table component extends [EditorJsTable](https://www.npmjs.com/package/@editorjs/table) and includes the following sanitization rules:

```typescript
{
  br: true,
  div: true,
  a: true,
  i: true,
  p: true,
  b: true
}
```

## Contributing

We welcome contributions!

## Releases

Semantic-release automatically publishes a new version to npm whenever changes are merged into `main`. Make sure your commits follow the Conventional Commits specification.

## Acknowledgments

Special thanks to the all amazing open-source projects that made this library possible!

## License

MIT ©
