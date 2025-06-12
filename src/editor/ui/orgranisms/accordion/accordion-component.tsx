import { FC, useState } from "react";

import { OutputData } from "@editorjs/editorjs";
import { Pencil, ChevronDown } from "lucide-react";

import { AccordionContent } from "./accordion-content";
import { AccordionEditorDrawer } from "./accordion-editor-drawer";
import { TAccordionData } from "./types";

import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";

type TAccordionComponentProps = {
  blockId: string;
  item: TAccordionData;
  variant: "primary" | "secondary";
  onTitleChange: (title?: string) => void;
  onContentChange: (content?: null | OutputData) => void;
};

export const AccordionComponent: FC<TAccordionComponentProps> = ({
  item,
  variant,
  onContentChange,
  onTitleChange,
  blockId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Accordion"
        variant={variant}
        tooltipText="Component for creating expandable sections with content"
      />

      <div className="bf-min-h-[200px]">
        <div className="bf-grid bf-grid-cols-1 bf-gap-4">
          <div className="bf-border-b bf-border-r bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item">
            <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
              <div className="bf-flex-1">
                <div className="bf-flex bf-items-center bf-justify-between">
                  <h3 className="bf-text-lg bf-font-medium">
                    {item.title || "Untitled Section"}
                  </h3>
                </div>
                <div className="bf-p-4 bf-pb-6">
                  <AccordionContent item={item} />
                </div>
              </div>
              <EditorButton
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="bf-size-4" />
              </EditorButton>
            </div>
          </div>
        </div>
      </div>

      <AccordionEditorDrawer
        blockId={blockId}
        isOpen={isEditing}
        initialTitle={item.title}
        initialData={item.content}
        onClose={() => setIsEditing(false)}
        onSave={(data, title) => {
          onContentChange(data);
          onTitleChange(title);
        }}
      />
    </div>
  );
};
