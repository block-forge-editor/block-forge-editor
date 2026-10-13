import { FC, JSX } from "react";

import { Typography } from "../typography";

import { cn } from "@/editor/lib/font-manager";

type TProps = {
  className?: string;
  variant?: "success" | "default";
  children?: string | JSX.Element;
};

export const Tag: FC<TProps> = ({
  children,
  variant = "default",
  className,
}) => {
  return (
    <Typography
      className={cn(
        "bf-py-0.5 bf-px-1.5 bf-rounded",
        {
          "bf-bg-muted": variant === "default",
          "bf-bg-green-100 bf-text-brand dark:bf-bg-green-950/40 dark:bf-text-green-300":
            variant === "success",
        },
        className,
      )}
    >
      {children}
    </Typography>
  );
};
