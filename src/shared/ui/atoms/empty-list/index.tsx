import { FC } from "react";

import { RoundedBox } from "../rounded-box";
import { Typography } from "../typography";

import { cn } from "@/shared/lib/utils";

type TProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export const EmptyList: FC<TProps> = ({ title, subtitle, className }) => {
  return (
    <RoundedBox
      className={cn(
        "py-4 px-12 flex flex-col justify-center items-center text-center gap-5 min-h-[300px]",
        className,
      )}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography className="text-sm">{subtitle}</Typography>
    </RoundedBox>
  );
};
