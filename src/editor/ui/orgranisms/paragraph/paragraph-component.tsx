import type { FC } from "react";
import { useRef, useEffect } from "react";

import { getFontSizeClassTSX } from "@/editor/lib/utils";

type TParagraphComponentProps = {
  text: string;
  fontSize?: number;
  onUpdate: (data: { text: string; fontSize?: number }) => void;
};

export const ParagraphComponent: FC<TParagraphComponentProps> = ({
  text,
  fontSize,
  onUpdate,
}) => {
  const fontSizeClass = getFontSizeClassTSX({ fontSize });
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable
      style={fontSizeClass}
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: text }}
      className="bf-outline-none bf-w-full bf-break-words"
      onInput={(e) => {
        onUpdate({
          text: e.currentTarget.innerHTML,
          fontSize,
        });
      }}
    />
  );
};
