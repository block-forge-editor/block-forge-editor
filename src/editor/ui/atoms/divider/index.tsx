import { FC } from "react";

import { cn } from "@/editor/lib/utils";

type TProps = {
  dashed?: boolean;
  className?: string;
};

export const Divider: FC<TProps> = ({ className, dashed }) => {
  return (
    <hr
      className={cn(
        className,
        "bf-w-full bf-bg-gray-100",
        dashed && "bf-border-dashed",
      )}
    />
  );
};
