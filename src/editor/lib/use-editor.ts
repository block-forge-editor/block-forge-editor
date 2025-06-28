import { useRef, useEffect, useState } from "react";

import type { OutputData, EditorConfig } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";
// @ts-expect-error
import DragDrop from "editorjs-drag-drop";
// @ts-expect-error
import Undo from "editorjs-undo";
import { getToolsConfig } from "./tools-manager";
import { TToolPreset } from "./tools-constants";

type TUseEditor = {
  id: string;
  initialData?: any;
  tools?: EditorConfig["tools"];
  toolPreset?: TToolPreset;
  enabledTools?: string[];
  customTools?: EditorConfig["tools"];
  onChange?: (data: OutputData) => void;
};

export const useEditor = ({
  tools,
  initialData,
  id,
  onChange,
  toolPreset,
  enabledTools,
  customTools,
}: TUseEditor) => {
  const ejInstance = useRef<null | EditorJS>(null);
  const isReady = useRef(false);
  const [toolsConfig, setToolsConfig] = useState<EditorConfig["tools"]>({});
  const [isLoading, setIsLoading] = useState(true);

  const handleReady = (editor: EditorJS) => {
    new DragDrop(editor);
    new Undo({ editor });
  };

  useEffect(() => {
    const loadTools = async () => {
      setIsLoading(true);

      try {
        const config = await getToolsConfig(
          toolPreset,
          enabledTools,
          customTools,
        );

        setToolsConfig(config);
      } catch (error) {
        console.error("Failed to load tools:", error);
        setToolsConfig({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTools();
  }, [toolPreset, enabledTools, customTools]);

  useEffect(() => {
    if (ejInstance.current === null && !isReady.current && !isLoading) {
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
          ...toolsConfig,
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
  }, [isLoading, toolsConfig]);

  return { ejInstance, isLoading };
};
