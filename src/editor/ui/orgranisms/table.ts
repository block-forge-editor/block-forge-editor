import EditorJsTable from "@editorjs/table";

export class BlockForgeTable extends EditorJsTable {
  static get sanitize() {
    return {
      br: true,
      div: true,
      a: true,
      i: true,
      p: true,
      b: true,
    };
  }
}
