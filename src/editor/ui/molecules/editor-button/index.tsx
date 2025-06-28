import { FC, ButtonHTMLAttributes } from "react";

import { cn } from "@/editor/lib/font-manager";

type EditorButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const EditorButton: FC<EditorButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  return (
    <button
      className={cn(
        "bf-transition-colors",
        variant === "primary" && "bf-rounded-xl bf-p-1 hover:bf-bg-gray-100",
        variant === "secondary" &&
          "bf-p-1 bf-text-gray-500 bf-rounded-md hover:bf-bg-gray-50 bf-opacity-0 group-hover/item:bf-opacity-100 bf-transition-opacity",
        variant === "icon" && "bf-rounded-xl bf-p-1 hover:bf-bg-gray-100",
        size === "sm" && "bf-size-4",
        size === "md" && "bf-size-6",
        size === "lg" && "bf-size-8",
        className,
      )}
      {...props}
    />
  );
};
