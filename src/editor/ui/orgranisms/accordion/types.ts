import { OutputBlockData } from "@editorjs/editorjs";

export type TAccordionData = {
  title: string;
  content: {
    time: number;
    blocks: OutputBlockData[];
  };
};
