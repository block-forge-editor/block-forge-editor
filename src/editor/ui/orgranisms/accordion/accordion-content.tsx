import { FC } from "react";

import { LayoutGrid } from "lucide-react";

import { TAccordionData } from "./types";

import { ComponentsList } from "@/editor/ui/atoms/components-list";

type TAccordionContentProps = {
  item: TAccordionData;
};

export const AccordionContent: FC<TAccordionContentProps> = ({ item }) => {
  if (item.content?.blocks?.length) {
    return <ComponentsList blocks={item.content.blocks} />;
  }

  return (
    <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-h-full bf-text-gray-400">
      <LayoutGrid className="bf-size-8 bf-mb-2" />
      <span className="bf-text-center">Empty Column</span>
    </div>
  );
};
