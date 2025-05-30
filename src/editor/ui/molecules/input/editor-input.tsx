import { FC, InputHTMLAttributes } from "react";

import { cn } from "@/editor/lib/utils";

type EditorInputProps = {
  variant?: "primary" | "secondary";
} & InputHTMLAttributes<HTMLInputElement>;

export const EditorInput: FC<EditorInputProps> = ({
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <input
      className={cn(
        "bf-text-sm custom-scroll bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors bf-placeholder:bf-text-gray-400",
        variant === "secondary" && "bf-text-xs bf-text-gray-500",
        className,
      )}
      {...props}
    />
  );
};
