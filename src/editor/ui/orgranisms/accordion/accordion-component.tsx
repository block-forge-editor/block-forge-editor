import { FC, useState } from "react";

import { OutputData } from "@editorjs/editorjs";
import { Pencil } from "lucide-react";

import { AccordionContent } from "./accordion-content";
import { AccordionEditorDrawer } from "./accordion-editor-drawer";
import { TAccordionData } from "./types";

import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { AccordionEditor } from "./accordeon-editor";
import { TOOLBOX_TITLE } from "./constants";

type TAccordionComponentProps = {
  blockId: string;
  item: TAccordionData;
  onTitleChange: (title?: string) => void;
  onContentChange: (content?: null | OutputData) => void;
};

export const AccordionComponent: FC<TAccordionComponentProps> = ({
  item,
  onContentChange,
  onTitleChange,
  blockId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={`${TOOLBOX_TITLE} ${item.title}`}
        tooltipText="Component for creating expandable sections with content"
      />

      <div className="bf-min-h-[200px]">
        <div className="bf-grid bf-grid-cols-1 bf-gap-4">
          <div className="bf-flex bf-items-start bf-justify-between bf-gap-4 bf-group/item bf-border-b">
            <div className="bf-flex-1">
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

      <AccordionEditorDrawer
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      >
        <AccordionEditor
          onSave={(data, title) => {
            onContentChange(data);
            onTitleChange(title);
          }}
          blockId={blockId}
          onClose={() => setIsEditing(false)}
          initialData={item.content}
          initialTitle={item.title}
        />
      </AccordionEditorDrawer>
    </div>
  );
};
