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
      onSave={handeSave}
      onCancel={handleCancel}
      tools={[...array of your editor js tools]}
    />
  );
}
```

## Available Blocks

The library includes a comprehensive set of pre-built blocks:

### Text & Content

- Header
- Paragraph
- List
- Quote
- Code
- Divider

### Media & Visual

- Image Gallery
- Image
- Embed
- Table

### Layout & Structure

- Columns
- Card
- Accordion

### Interactive & Dynamic

- Progress
- Timeline
- Stats
- Testimonials
- Social Media Components

## Contributing

We welcome contributions!

## Acknowledgments

Special thanks to the all amazing open-source projects that made this library possible!

## License

MIT ©
