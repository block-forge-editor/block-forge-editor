import { FC, useState } from "react";

import { X, Plus, BarChart } from "lucide-react";

import { cn } from "@/editor/lib/utils";
import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { EditorInput } from "@/editor/ui/molecules/input/editor-input";
import { TProgressData } from "./types";
import { TOOLBOX_TITLE } from "./constants";

type TProgressComponentProps = {
  items: TProgressData["items"];
  onUpdate: (items: TProgressData["items"]) => void;
  onUpdateWithRerender: (items: TProgressData["items"]) => void;
};

export const ProgressComponent: FC<TProgressComponentProps> = ({
  items,
  onUpdate,
  onUpdateWithRerender,
}) => {
  const [localItems, setLocalItems] = useState(items);

  const handleAddItem = () => {
    const newItems = [
      ...localItems,
      {
        label: "",
        value: 0,
      },
    ];
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
    field: "label" | "value",
    value: string,
  ) => {
    const newItems = localItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );

    setLocalItems(newItems);
    onUpdate(newItems);
  };

  const handleNumberChange = (index: number, value: string) => {
    if (value === "") {
      handleItemChange(index, "value", "0");
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    handleItemChange(index, "value", value);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Display progress bars with labels and values"
      >
        <EditorButton
          onClick={handleAddItem}
          className="bf-rounded-xl bf-p-1 bf-hover:bf-bg-gray-100 bf-transition-colors"
        >
          <Plus className="bf-size-4 bf-text-gray-600" />
        </EditorButton>
      </ComponentHeader>

      <div className={cn("bf-min-h-[200px]")}>
        <div className="bf-grid bf-grid-cols-1 bf-gap-4">
          {localItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item",
              )}
            >
              <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
                <div className="bf-flex bf-items-center bf-gap-3">
                  <BarChart className="bf-size-6 bf-text-gray-500" />
                  <div className="bf-flex-1">
                    <EditorInput
                      type="text"
                      value={item.label}
                      placeholder="Enter label"
                      onChange={(e) =>
                        handleItemChange(index, "label", e.target.value)
                      }
                      className="bf-text-sm bf-custom-scroll bf-font-medium bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-rounded-md bf-px-2 bf-py-1 bf-hover:bf-bg-gray-50 bf-transition-colors"
                    />
                  </div>
                </div>
                <div className="bf-flex bf-items-center bf-gap-2">
                  <EditorInput
                    value={item.value}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    className="bf-w-10 bf-text-sm bf-text-right bf-bg-transparent bf-border-none bf-outline-none bf-rounded-md bf-px-2 bf-py-1 bf-hover:bf-bg-gray-50 bf-transition-colors"
                  />
                  <span className="bf-text-sm bf-text-gray-500">%</span>
                  <EditorButton
                    variant="secondary"
                    onClick={() => handleRemoveItem(index)}
                    className="bf-p-1 bf-text-gray-500 bf-rounded-md bf-hover:bf-bg-gray-50 bf-opacity-0 bf-group-hover/item:bf-opacity-100 bf-transition-opacity"
                  >
                    <X className="bf-size-4" />
                  </EditorButton>
                </div>
              </div>
              <div className="bf-h-1 bf-bg-gray-200 bf-rounded-full bf-overflow-hidden">
                <div
                  style={{ width: `${item.value}%` }}
                  className={cn(
                    "bf-h-full bf-transition-all bf-duration-300",
                    item.value > 50 ? "bf-bg-blue-500" : "bf-bg-red-500",
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        {localItems.length === 0 && (
          <div className="bf-flex bf-border-b bf-flex-col bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
            <BarChart className="bf-size-8 bf-mb-2" />
            <span>No progress bars yet</span>
          </div>
        )}
      </div>
    </div>
  );
};
