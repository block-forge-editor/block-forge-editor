import { FC, TextareaHTMLAttributes } from "react";

import { cn } from "@/editor/lib/font-manager";

type EditorTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const EditorTextarea: FC<EditorTextareaProps> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn(
        "bf-text-sm custom-scroll bf-text-gray-600 bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-resize-none bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors bf-placeholder:bf-text-gray-400",
        className,
      )}
      {...props}
    />
  );
};
