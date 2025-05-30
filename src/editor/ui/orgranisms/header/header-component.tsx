import { getFontSizeClassTSX } from "@/editor/lib/utils";
import type { FC } from "react";
import { useRef, useEffect } from "react";

type THeaderComponentProps = {
  text: string;
  level: number;
  fontSize: number;
  onUpdate: (data: { text: string; level: number; fontSize: number }) => void;
};

export const HeaderComponent: FC<THeaderComponentProps> = ({
  text,
  fontSize,
  level,
  onUpdate,
}) => {
  const fontSizeClass = getFontSizeClassTSX({
    level,
    fontSize,
  });

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
      className="bf-font-semibold bf-outline-none bf-w-full bf-break-words bf-m-0"
      onInput={(e) => {
        onUpdate({
          text: e.currentTarget.innerHTML,
          fontSize,
          level,
        });
      }}
    />
  );
};
