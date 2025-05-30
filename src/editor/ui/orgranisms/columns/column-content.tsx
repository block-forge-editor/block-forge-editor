import { FC } from "react";

import { LayoutGrid } from "lucide-react";

import { TColumnData } from "./types";

import { ComponentsList } from "@/editor/ui/atoms";

type TColumnContentProps = {
  column: TColumnData;
};

export const ColumnContent: FC<TColumnContentProps> = ({ column }) => {
  if (column.content?.blocks?.length) {
    return <ComponentsList blocks={column.content.blocks} />;
  }

  return (
    <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-h-full bf-text-gray-400">
      <LayoutGrid className="bf-size-8 bf-mb-2" />
      <span className="bf-text-center">Empty Column</span>
    </div>
  );
};
