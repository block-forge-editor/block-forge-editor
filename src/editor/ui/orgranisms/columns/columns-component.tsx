import { FC, useState } from "react";
import React from "react";

import { OutputData } from "@editorjs/editorjs";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { ColumnContent } from "./column-content";
import { ColumnEditorDrawer } from "./column-editor-drawer";
import { TColumnData } from "./types";

import { cn } from "@/editor/lib/font-manager";
import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/editor/ui/shadcn/ui/resizable";

type TColumnsComponentProps = {
  blockId: string;
  columns: TColumnData[];
  onColumnAdd: () => void;
  onColumnDelete: (id: string) => void;
  onColumnContentChange: (id: string, content: OutputData) => void;
  onColumnSizeChange: (rowIndex: number, newSizes: number[]) => void;
};

export const ColumnsComponent: FC<TColumnsComponentProps> = ({
  columns,
  onColumnDelete,
  onColumnAdd,
  onColumnSizeChange,
  onColumnContentChange,
  blockId,
}) => {
  const [editingColumnId, setEditingColumnId] = useState<null | string>(null);

  const chunkedColumns = [];
  for (let i = 0; i < columns.length; i += 4) {
    chunkedColumns.push(columns.slice(i, i + 4));
  }

  const renderRow = (rowColumns: TColumnData[], rowIndex: number) => (
    <ResizablePanelGroup
      direction="horizontal"
      key={`row-${rowIndex}`}
      className="bf-min-h-[200px]"
      onLayout={(sizes) => {
        onColumnSizeChange(rowIndex, sizes);
      }}
    >
      {rowColumns.map((column, index) => (
        <React.Fragment key={column.id}>
          <ResizablePanel defaultSize={column.size || 100 / rowColumns.length}>
            <div className="bf-relative bf-h-full bf-group/item bf-p-2 bf-flex bf-flex-col bf-items-center bf-border-b bf-border-gray-200">
              <div className="bf-self-end bf-flex bf-gap-4">
                <div className="bf-flex bf-gap-2">
                  <EditorButton
                    variant="secondary"
                    onClick={() => setEditingColumnId(column.id)}
                  >
                    <Pencil className="bf-size-4" />
                  </EditorButton>
                  <EditorButton
                    variant="secondary"
                    onClick={() => onColumnDelete(column.id)}
                  >
                    <Trash2 className="bf-size-4" />
                  </EditorButton>
                </div>
              </div>

              <div
                className={cn(
                  "bf-justify-self-end bf-h-full",
                  column.content?.blocks?.length ? "bf-mb-0" : "bf-mb-4",
                )}
              >
                <ColumnContent column={column} />
              </div>
            </div>
          </ResizablePanel>
          {index < rowColumns.length - 1 && (
            <ResizableHandle key={`handle-${column.id}`} />
          )}
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  );

  const editingColumn = columns.find((col) => col.id === editingColumnId);

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Columns"
        tooltipText="Component for creating columns with content"
      >
        <button onClick={onColumnAdd}>
          <Plus className="bf-size-4 bf-text-gray-600" />
        </button>
      </ComponentHeader>

      <div className="bf-w-full bf-space-y-4">
        {chunkedColumns.map((rowColumns, rowIndex) =>
          renderRow(rowColumns, rowIndex),
        )}
      </div>

      <ColumnEditorDrawer
        blockId={blockId}
        isOpen={!!editingColumnId}
        initialData={editingColumn?.content}
        onClose={() => setEditingColumnId(null)}
        onSave={(data) => {
          if (editingColumnId) {
            onColumnContentChange(editingColumnId, data);
          }
        }}
      />
    </div>
  );
};
