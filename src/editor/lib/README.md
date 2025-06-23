# BlockForge Editor Tools Management

## Обзор

Новая система управления инструментами в BlockForge Editor предоставляет:

1. **Lazy Loading** - инструменты загружаются только когда нужны
2. **Гибкая настройка** - возможность переопределять дефолтные инструменты
3. **Пресеты** - готовые наборы инструментов для разных сценариев
4. **Обратная совместимость** - старые API продолжают работать

## Основные возможности

### 1. Использование пресетов

```tsx
import { BlockForgeEditor } from './editor';

// Минимальный набор инструментов
<BlockForgeEditor
  id="editor-1"
  toolPreset="minimal"
/>

// Базовый набор
<BlockForgeEditor
  id="editor-2"
  toolPreset="basic"
/>

// Медиа набор
<BlockForgeEditor
  id="editor-3"
  toolPreset="media"
/>

// Полный набор (по умолчанию)
<BlockForgeEditor
  id="editor-4"
  toolPreset="full"
/>
```

### 2. Кастомный список инструментов

```tsx
<BlockForgeEditor
  id="editor-5"
  enabledTools={["paragraph", "list", "imageSingle", "quote"]}
/>
```

### 3. Переопределение инструментов

```tsx
import { CustomParagraph } from "./custom-components";

<BlockForgeEditor
  id="editor-6"
  customTools={{
    paragraph: {
      class: CustomParagraph,
      config: {
        preserveBlank: true,
      },
    },
    // Можно переопределить любой инструмент
  }}
/>;
```

### 4. Комбинирование подходов

```tsx
<BlockForgeEditor
  id="editor-7"
  toolPreset="basic"
  customTools={{
    paragraph: CustomParagraph,
  }}
  enabledTools={["paragraph", "list", "customTool"]} // Добавляем кастомный инструмент
/>
```

## Доступные пресеты

### `minimal`

- paragraph
- list
- divider

### `basic`

- paragraph
- list
- table
- divider
- quote
- code

### `media`

- paragraph
- list
- imageSingle
- imageGallery
- videoEmbed
- figma

### `full`

Все доступные инструменты

### `accordion`

- paragraph
- list
- divider
- table

### `columns`

- paragraph
- list
- divider
- table

## API Reference

### `getToolsConfig(preset?, enabledTools?, customTools?)`

Асинхронная функция для создания конфигурации инструментов.

```tsx
import { getToolsConfig } from "./lib/tools";

const tools = await getToolsConfig("basic", undefined, {
  paragraph: CustomParagraph,
});
```

### `getToolPreset(presetName)`

Получить список инструментов для пресета.

```tsx
import { getToolPreset } from "./lib/tools";

const tools = getToolPreset("minimal"); // ['paragraph', 'list', 'divider']
```

### `getAllAvailableTools()`

Получить список всех доступных инструментов.

```tsx
import { getAllAvailableTools } from "./lib/tools";

const allTools = getAllAvailableTools();
```

## Lazy Loading

Инструменты загружаются только когда нужны, что улучшает производительность:

- **Внешние инструменты**: `@editorjs/list`
- **Внутренние инструменты**: Все BlockForge компоненты

Кэширование обеспечивает, что каждый инструмент загружается только один раз.

## Обратная совместимость

Старые константы (`CONSTRUCTOR_EDITOR_TOOLS`, `ACCORDION_EDITOR_TOOLS`, `COLUMNS_EDITOR_TOOLS`) остаются доступными, но помечены как deprecated. Рекомендуется использовать новый API.

## Типы

```tsx
type ToolPreset =
  | "minimal"
  | "basic"
  | "media"
  | "full"
  | "accordion"
  | "columns";

type ToolConfig = {
  class: any;
  config?: Record<string, any>;
  inlineToolbar?: boolean;
  toolbox?: {
    title: string;
    icon?: string;
  };
};

type ToolsRegistry = Record<string, ToolConfig>;
```

## Примеры использования

### Простой редактор с минимальным набором

```tsx
<BlockForgeEditor
  id="simple-editor"
  toolPreset="minimal"
  onSave={(data) => console.log(data)}
/>
```

### Редактор для статей с кастомным параграфом

```tsx
<BlockForgeEditor
  id="article-editor"
  toolPreset="basic"
  customTools={{
    paragraph: {
      class: ArticleParagraph,
      config: {
        preserveBlank: true,
        maxLength: 1000,
      },
    },
  }}
/>
```

### Редактор для медиа-контента

```tsx
<BlockForgeEditor
  id="media-editor"
  toolPreset="media"
  enabledTools={["paragraph", "imageSingle", "videoEmbed", "customMediaTool"]}
/>
```
