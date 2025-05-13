import { FC } from "react";

import { createComponentsList } from "@/shared/lib/helpers/components-list";
import { getFontSizeClass } from "@/shared/lib/paragraph";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/shadcn";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/shared/ui/shadcn/ui/accordion";

import { ComponentHeader } from "@/shared/ui/molecules/component-header";

type TAccordionComponentProps = {
  title: string;
  fontSize: number;
  isEditable?: boolean;
  variant: "primary" | "secondary";
  onTitleChange: (title: string) => void;
  content: null | {
    time: number;
    blocks: any[];
  };
};

export const AccordionComponent: FC<TAccordionComponentProps> = ({
  title,
  fontSize,
  variant,
  content,
  onTitleChange,
  isEditable = true,
}) => {
  const fontSizeClass = getFontSizeClass({ fontSize });

  const renderContent = () => {
    if (content?.blocks?.length) {
      const componentsList = createComponentsList(content.blocks);
      return (
        <div dangerouslySetInnerHTML={{ __html: componentsList.outerHTML }} />
      );
    }

    return (
      <>
        <Skeleton className="h-[26px] w-full" />
        <Skeleton className="h-[26px] w-full" />
        <Skeleton className="h-[26px] w-full" />
      </>
    );
  };

  return (
    <div className="relative group w-full">
      <ComponentHeader
        title="Аккордеон"
        tooltipText="Компонент для создания аккордеона"
        variant={variant}
      />

      <Accordion collapsible type="single" className="w-full">
        <AccordionItem value="first">
          <AccordionTrigger>
            <div className="flex items-center gap-2 w-full group/title">
              <div
                contentEditable={isEditable}
                suppressContentEditableWarning
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "font-medium outline-none max-w-[500px] break-words",
                  fontSizeClass,
                  isEditable && "cursor-text",
                )}
                onBlur={(e) => {
                  const newTitle = e.currentTarget.textContent?.trim() || title;
                  onTitleChange(newTitle);
                  if (!newTitle) {
                    e.currentTarget.textContent = title;
                  }
                }}
              >
                {title}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">{renderContent()}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
