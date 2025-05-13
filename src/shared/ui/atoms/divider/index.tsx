import { FC } from "react";

import { cn } from "@shared/lib/utils";

type TProps = {
  className?: string;
};

export const Divider: FC<TProps> = ({ className }) => {
  return <hr className={cn(className, "w-full bg-gray-100")} />;
};
