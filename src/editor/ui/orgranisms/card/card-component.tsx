import { FC, useState } from "react";

import { cn } from "@/editor/lib/utils";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { IconSelect } from "@/editor/ui/molecules/icon-select";
import { EditorInput } from "@/editor/ui/molecules/input/editor-input";
import { EditorTextarea } from "@/editor/ui/molecules";
import { TCardData } from "./types";
import { TOOLBOX_TITLE } from "./constants";

type TCardComponentProps = {
  icon: string;
  title: string;
  description: string;
  onUpdate: (data: Partial<TCardData>) => void;
};

export const CardComponent: FC<TCardComponentProps> = ({
  title,
  description,
  icon,
  onUpdate,
}) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localIcon, setLocalIcon] = useState(icon);

  const handleTitleChange = (value: string) => {
    setLocalTitle(value);
    onUpdate({ title: value, description: localDescription });
  };

  const handleDescriptionChange = (value: string) => {
    setLocalDescription(value);
    onUpdate({ title: localTitle, description: value });
  };

  const handleIconChange = (value: string) => {
    setLocalIcon(value);
    onUpdate({
      title: localTitle,
      description: localDescription,
      icon: value,
    });
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Create an information card with title and description"
      />

      <div className={cn("bf-min-h-[200px]")}>
        <div className="bf-flex bf-flex-col bf-gap-4 bf-p-4 bf-border-b">
          <div className="bf-flex bf-items-start bf-gap-3">
            <div className="bf-flex bf-items-center bf-justify-center bf-size-12 bf-rounded-full bf-bg-gray-100">
              <IconSelect
                value={localIcon || "BarChart3"}
                onChange={(value) => handleIconChange(value)}
              />
            </div>
            <div className="bf-flex-1">
              <EditorInput
                type="text"
                value={localTitle}
                placeholder="Enter title"
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bf-text-lg custom-scroll bf-font-medium bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
              />
              <EditorTextarea
                rows={3}
                value={localDescription}
                placeholder="Enter description"
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="bf-text-sm custom-scroll bf-text-gray-600 bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-mt-2 bf-resize-none bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
