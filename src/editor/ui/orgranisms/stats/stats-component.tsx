import { FC, useState } from "react";

import { X, Plus, BarChart3 } from "lucide-react";

import { cn } from "@/editor/lib/utils";
import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { IconSelect } from "@/editor/ui/molecules/icon-select";
import { EditorInput } from "@/editor/ui/molecules/input/editor-input";
import { TStatsData } from "./types";
import { TOOLBOX_TITLE } from "./constants";

type TStatsComponentProps = {
  items: TStatsData["items"];
  onUpdate: (items: TStatsData["items"]) => void;
  onUpdateWithRerender: (items: TStatsData["items"]) => void;
};

export const StatsComponent: FC<TStatsComponentProps> = ({
  items,
  onUpdate,
  onUpdateWithRerender,
}) => {
  const [localItems, setLocalItems] = useState(items);

  const handleAddItem = () => {
    const newItems = [...localItems, { value: "", label: "", icon: "" }];
    setLocalItems(newItems);
    onUpdateWithRerender(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = localItems.filter((_, i) => i !== index);
    setLocalItems(newItems);
    onUpdateWithRerender(newItems);
  };

  const handleItemChange = (
    index: number,
    field: "icon" | "value" | "label",
    value: string,
  ) => {
    const newItems = localItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    setLocalItems(newItems);
    onUpdate(newItems);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Display statistics and metrics with numbers and labels"
      >
        <EditorButton
          onClick={handleAddItem}
          className="bf-rounded-xl bf-p-1 hover:bf-bg-gray-100 bf-transition-colors"
        >
          <Plus className="bf-size-4 bf-text-gray-600" />
        </EditorButton>
      </ComponentHeader>

      <div className={cn("bf-min-h-[200px]")}>
        <div className="bf-grid bf-grid-cols-1 bf-md:bf-grid-cols-2 bf-lg:bf-grid-cols-3 bf-gap-4">
          {localItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "bf-border-b bf-border-r bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item",
              )}
            >
              <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
                <div className="bf-flex bf-items-center bf-gap-3">
                  <div className="bf-flex bf-items-center bf-justify-center bf-size-12 bf-rounded-full bf-bg-gray-100">
                    <IconSelect
                      value={item.icon || "BarChart3"}
                      onChange={(value) =>
                        handleItemChange(index, "icon", value)
                      }
                    />
                  </div>
                  <div className="bf-flex-1">
                    <EditorInput
                      type="text"
                      placeholder="0"
                      value={item.value}
                      onChange={(e) =>
                        handleItemChange(index, "value", e.target.value)
                      }
                      className="bf-text-sm custom-scroll bf-font-medium bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
                    />
                    <EditorInput
                      type="text"
                      value={item.label}
                      placeholder="Enter label"
                      onChange={(e) =>
                        handleItemChange(index, "label", e.target.value)
                      }
                      className="bf-text-xs custom-scroll bf-text-gray-500 bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-mt-1 bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
                    />
                  </div>
                </div>
                <EditorButton
                  onClick={() => handleRemoveItem(index)}
                  className="bf-p-1 bf-text-gray-500 bf-rounded-md hover:bf-bg-gray-50 bf-opacity-0 group-hover/item:bf-opacity-100 bf-transition-opacity"
                >
                  <X className="bf-size-4" />
                </EditorButton>
              </div>
            </div>
          ))}
        </div>
        {localItems.length === 0 && (
          <div className="bf-flex bf-flex-col bf-border-b bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
            <BarChart3 className="bf-size-8 bf-mb-2" />
            <span>No statistics yet</span>
          </div>
        )}
      </div>
    </div>
  );
};
