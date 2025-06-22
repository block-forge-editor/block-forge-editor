import { FC, JSX } from "react";

import { Typography } from "../typography";

import { cn } from "@/editor/lib/utils";

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
          "bf-bg-gray-200": variant === "default",
          "bf-bg-green-100 bf-text-brand": variant === "success",
        },
        className,
      )}
    >
      {children}
    </Typography>
  );
};
