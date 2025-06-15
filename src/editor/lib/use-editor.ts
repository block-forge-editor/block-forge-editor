import { useRef, useEffect } from "react";

import type { OutputData, EditorConfig } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";
// @ts-expect-error
import DragDrop from "editorjs-drag-drop";
// @ts-expect-error
import Undo from "editorjs-undo";

type TUseEditor = {
  id: string;
  initialData?: any;
  tools: EditorConfig["tools"];
  onChange?: (data: OutputData) => void;
};

export const useEditor = ({ tools, initialData, id, onChange }: TUseEditor) => {
  const ejInstance = useRef<null | EditorJS>(null);
  const isReady = useRef(false);

  const handleReady = (editor: EditorJS) => {
    new DragDrop(editor);
    new Undo({ editor });
  };

  useEffect(() => {
    if (ejInstance.current === null && !isReady.current) {
      const editor = new EditorJS({
        autofocus: true,
        holder: id,
        onReady: () => {
          ejInstance.current = editor;
          handleReady(editor);
        },
        onChange: () => {
          if (!ejInstance.current) return;
          if (!onChange) return;

          void ejInstance.current?.save().then(onChange);
        },
        data: initialData,
        tools: {
          ...tools,
        },
        inlineToolbar: true,
      });

      isReady.current = true;
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ejInstance;
};
