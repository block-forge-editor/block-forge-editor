import { FC } from "react";

import type { OutputBlockData } from "@editorjs/editorjs";
import { Link, List, Text, Table, Image, Minus, Heading } from "lucide-react";

type TComponentsListProps = {
  blocks: OutputBlockData[];
};

export const ComponentsList: FC<TComponentsListProps> = ({ blocks }) => {
  const maxVisibleItems = 4;
  const totalItems = blocks.length;
  const visibleBlocks = blocks.slice(0, maxVisibleItems);

  const getBlockInfo = (type: string) => {
    switch (type) {
      case "header":
        return { icon: <Heading className="bf-size-4" />, label: "Title" };
      case "paragraph":
        return { icon: <Text className="bf-size-4" />, label: "Text" };
      case "customLink":
        return { icon: <Link className="bf-size-4" />, label: "Link" };
      case "image":
        return { icon: <Image className="bf-size-4" />, label: "Image" };
      case "table":
        return { icon: <Table className="bf-size-4" />, label: "Table" };
      case "divider":
        return {
          icon: <Minus className="bf-size-4" />,
          label: "Divider",
        };
      case "list":
        return { icon: <List className="bf-size-4" />, label: "List" };
      default:
        return { icon: "", label: type };
    }
  };

  return (
    <div className="bf-flex bf-flex-col bf-h-full bf-justify-center bf-items-center bf-gap-1.5 bf-w-full">
      <div className="bf-grid bf-grid-cols-2 bf-gap-1.5">
        {visibleBlocks.map((block, index) => {
          const { icon, label } = getBlockInfo(block.type);
          return (
            <div
              key={index}
              className="bf-flex bf-items-center bf-gap-1.5 bf-px-2 bf-py-1.5 bf-bg-muted/50 bf-border bf-border-border bf-rounded-md bf-text-xs"
            >
              <span className="bf-text-muted-foreground">{icon}</span>
              <span className="bf-text-muted-foreground bf-truncate">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {totalItems > maxVisibleItems && (
        <div className="bf-flex bf-items-center bf-gap-1.5 bf-px-2 bf-py-1.5 bf-bg-orange-50/50 bf-border bf-border-orange-100 dark:bf-bg-orange-950/40 dark:bf-border-orange-900/40 bf-rounded-md bf-text-xs">
          <span className="bf-text-muted-foreground bf-truncate">
            +{totalItems - maxVisibleItems} more
          </span>
        </div>
      )}
    </div>
  );
};
