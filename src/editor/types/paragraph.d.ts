declare module "@editorjs/paragraph" {
  import type {
    API,
    ToolConfig,
    ConversionConfig,
    HTMLPasteEvent,
    PasteConfig,
    SanitizerConfig,
    ToolboxConfig,
  } from "@editorjs/editorjs";

  export interface ParagraphData {
    text: string;
    fontSize: number;
    tag: string;
  }

  export interface ParagraphConfig extends ToolConfig {
    placeholder?: string;
    preserveBlank?: boolean;
  }

  interface ParagraphParams {
    data: ParagraphData;
    config: ParagraphConfig;
    api: API;
    readOnly: boolean;
  }

  interface ParagraphCSS {
    block: string;
    wrapper: string;
  }

  export default class Paragraph {
    static get DEFAULT_PLACEHOLDER(): string;
    api: API;
    readOnly: boolean;
    public _CSS: ParagraphCSS;
    public _placeholder: string;
    public _data: ParagraphData;
    public _element: HTMLDivElement | null;
    public _preserveBlank: boolean;

    constructor({ data, config, api, readOnly }: ParagraphParams);
    onKeyUp(e: KeyboardEvent): void;
    drawView(): HTMLDivElement;
    render(): HTMLDivElement;
    merge(data: ParagraphData): void;
    validate(savedData: ParagraphData): boolean;
    save(toolsContent: HTMLDivElement): ParagraphData;
    onPaste(event: HTMLPasteEvent): void;
    static get conversionConfig(): ConversionConfig;
    static get sanitize(): SanitizerConfig;
    static get isReadOnlySupported(): boolean;
    static get pasteConfig(): PasteConfig;
    static get toolbox(): ToolboxConfig;
  }
}
