import { FC } from "react";

import {
  Plus,
  Trash2,
  Pencil,
  LayoutGrid,
  MousePointerClick,
} from "lucide-react";

import { TColumnData } from "./types";

import { createComponentsList } from "@/shared/lib/helpers/components-list";
import { cn } from "@/shared/lib/utils";
import { ComponentHeader } from "@/shared/ui/molecules/component-header";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/shared/ui/shadcn/ui/context-menu";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/shared/ui/shadcn/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/shared/ui/shadcn/ui/tooltip";

type TColumnsComponentProps = {
  columns: TColumnData[];
  onColumnAdd: () => void;
  onColumnDelete: (id: string) => void;
  variant: "fill" | "default" | "fill-each-column";
};

export const ColumnsComponent: FC<TColumnsComponentProps> = ({
  columns,
  variant,
  onColumnDelete,
  onColumnAdd,
}) => {
  const renderContent = (column: TColumnData) => {
    if (column.content?.blocks?.length) {
      const componentsList = createComponentsList(column.content.blocks);
      return (
        <div dangerouslySetInnerHTML={{ __html: componentsList.outerHTML }} />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <LayoutGrid className="size-8 mb-2" />
        <span>Колонка пуста</span>
      </div>
    );
  };

  const getColumnClass = () => {
    switch (variant) {
      case "fill":
        return "border border-gray-100 rounded-xl p-6";
      case "fill-each-column":
        return "border border-gray-100 rounded-xl p-6";
      default:
        return "";
    }
  };

  return (
    <div className="relative group w-full space-y-4">
      <ComponentHeader
        title="Колонки"
        variant={variant === "fill" ? "primary" : "secondary"}
        tooltipText="Компонент для создания колонок с контентом"
      >
        <button onClick={onColumnAdd} disabled={columns.length >= 4}>
          <Plus
            className={cn(
              "size-4 text-gray-600",
              columns.length >= 4 && "opacity-30",
            )}
          />
        </button>
      </ComponentHeader>

      <div className="w-full">
        <ResizablePanelGroup direction="vertical" className="min-h-[200px]">
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="horizontal">
              {columns.map((column, index) => (
                <>
                  <ResizablePanel
                    key={column.id}
                    defaultSize={100 / columns.length}
                  >
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  "relative h-full group/column p-2 cursor-context-menu",
                                  getColumnClass(),
                                )}
                              >
                                {renderContent(column)}
                                <div className="absolute right-2 top-2 opacity-0 group-hover/column:opacity-100 transition-opacity">
                                  <MousePointerClick className="size-4 text-gray-400" />
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Кликните правой кнопкой мыши для действий</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>
                          <Pencil className="mr-2 size-4" />
                          <span>Добавить контент</span>
                        </ContextMenuItem>
                        {columns.length > 1 && (
                          <ContextMenuItem
                            className="text-red-600"
                            onClick={() => onColumnDelete(column.id)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            <span>Удалить колонку</span>
                          </ContextMenuItem>
                        )}
                      </ContextMenuContent>
                    </ContextMenu>
                  </ResizablePanel>
                  {index < columns.length - 1 && <ResizableHandle />}
                </>
              ))}
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
