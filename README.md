# Block Forge

A modern React component library built with Radix UI and Tailwind CSS.

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
import { Button, Card } from "block-forge";

function App() {
  return (
    <Card>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Components

The library includes a variety of components built on top of Radix UI primitives:

- Buttons
- Cards
- Dialogs
- Dropdowns
- Forms
- And more...

For detailed documentation of each component, please visit our documentation site.

## Contributing

We welcome contributions! Please see our contributing guide for details.

## License

MIT © [Your Name]
