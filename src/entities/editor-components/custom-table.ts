// @ts-expect-error
import Table from '@editorjs/table'

export class CustomTable extends Table {
  static get sanitize() {
    return {
      br: true,
      div: true,
      a: true,
      i: true,
      p: true,
      b: true,
    }
  }
}
