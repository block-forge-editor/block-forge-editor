# Block Forge

[![](https://flat.badgen.net/npm/v/@alkhipce/editorjs-react?icon=npm)](https://www.npmjs.com/package/@alkhipce/editorjs-react)
[![](https://flat.badgen.net/github/stars/etozhealkhipce/editorjs-react)](https://github.com/etozhealkhipce/editorjs-react)
[![](https://flat.badgen.net/badge/demo/site/green)](https://editorjs-react.vercel.app/)

A powerful article builder for React based on EditorJS and built with shadcn/ui and Tailwind CSS. Create beautiful, structured content with a modern block-based editor.

## Features

- 🔌 Based on [EditorJS](https://editorjs.io/)
- 🎨 All-in-one block-based editing experience
- 🚀 Modern UI components built with React, Tailwind CSS, shadcn/ui
- 📦 Easy to integrate - no additional configuration needed

## Installation

```bash
npm install block-forge-editor
# or
yarn add block-forge-editor
# or
pnpm add block-forge-editor
```

## Requirements

- React 18 or higher

## Usage

```jsx
import { BlockForgeEditor } from "block-forge-editor";
import "block-forge-editor/dist/index.css";

function App() {
  return (
    <BlockForgeEditor
      data={initialData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      tools={[...array of your editor js tools]}
    />
  );
}
```

## Available Blocks

This document provides a comprehensive overview of the saved data structure for each component.

### AccordionEditor

```typescript
type TAccordionData = {
  title: string;
  data: OutputData | null;
};
```

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

## Acknowledgments

Special thanks to the all amazing open-source projects that made this library possible!

## License

MIT ©
