import { FC } from "react";

import { Typography } from "../typography";

import { cn } from "@/shared/lib/utils";

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
      // variant="small"
      className={cn(
        "py-0.5 px-1.5 rounded",
        {
          "bg-gray-200": variant === "default",
          "bg-green-100 text-brand": variant === "success",
        },
        className,
      )}
    >
      {children}
    </Typography>
  );
};
