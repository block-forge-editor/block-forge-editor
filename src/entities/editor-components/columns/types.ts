import { OutputBlockData } from "@editorjs/editorjs";

export type TColumnData = {
  id: string;
  content: null | {
    time: number;
    blocks: OutputBlockData[];
  };
};
