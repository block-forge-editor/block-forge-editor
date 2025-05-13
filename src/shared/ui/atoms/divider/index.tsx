import { FC } from "react";

import { cn } from "@shared/lib/utils";

type TProps = {
  dashed?: boolean;
  className?: string;
};

export const Divider: FC<TProps> = ({ className, dashed }) => {
  return (
    <hr
      className={cn(className, "w-full bg-gray-100", dashed && "border-dashed")}
    />
  );
};
