import type { FC } from "react";
import { EColors } from "@/editor/lib/utils";

type TDividerComponentProps = {
  color?: string;
};

export const DividerComponent: FC<TDividerComponentProps> = ({
  color = EColors.GRAY,
}) => {
  return (
    <div className="bf-w-full bf-h-[1px]" style={{ backgroundColor: color }} />
  );
};
