# Block Forge

A powerful page builder built with EditorJS, React, and Tailwind CSS. Create beautiful, structured content with a modern block-based editor.

## Features

- 🎨 Rich block-based editing experience
- 📱 Responsive design
- 🎯 Customizable blocks
- 🎭 Modern UI components
- 🚀 Built with React and Tailwind CSS
- 📦 Easy to integrate

## Installation

```bash
npm install block-forge
# or
yarn add block-forge
# or
pnpm add block-forge
```

## Requirements

- React 18 or higher
- Tailwind CSS 3.0 or higher
- EditorJS 2.0 or higher

## Setup

1. Add the following to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... your other content paths
    "./node_modules/block-forge/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ... your theme extensions
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

2. Import the styles in your main CSS file:

```css
@import "block-forge/dist/style.css";
```

## Usage

```jsx
import { Editor } from "block-forge";

function App() {
  return (
    <Editor
      data={initialData}
      onChange={handleChange}
      tools={
        {
          // Configure your EditorJS tools here
        }
      }
    />
  );
}
```

## Available Blocks

The library includes a variety of pre-built blocks:

- Text blocks
- Image blocks
- List blocks
- Quote blocks
- Code blocks
- And more...

Each block is fully customizable and can be extended with your own custom blocks.

## Customization

You can customize the appearance and behavior of blocks using Tailwind CSS classes and EditorJS configuration options.

## Contributing

We welcome contributions!

## License

MIT ©
