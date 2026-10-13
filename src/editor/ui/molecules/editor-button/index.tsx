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
        variant === "primary" && "bf-rounded-xl bf-p-1 hover:bf-bg-accent",
        variant === "secondary" &&
          "bf-p-1 bf-text-muted-foreground bf-rounded-md hover:bf-bg-accent bf-opacity-0 group-hover/item:bf-opacity-100 bf-transition-opacity",
        variant === "icon" && "bf-rounded-xl bf-p-1 hover:bf-bg-accent",
        size === "sm" && "bf-size-4",
        size === "md" && "bf-size-6",
        size === "lg" && "bf-size-8",
        className,
      )}
      {...props}
    />
  );
};
