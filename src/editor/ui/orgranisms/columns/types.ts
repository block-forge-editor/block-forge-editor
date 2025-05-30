import { OutputBlockData } from "@editorjs/editorjs";

export type TColumnData = {
  id: string;
  size?: number;
  content: null | {
    time: number;
    blocks: OutputBlockData[];
  };
};
