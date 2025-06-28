import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/editor/lib/font-manager";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "bf-flex bf-h-full bf-w-full data-[panel-group-direction=vertical]:bf-flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "bf-relative bf-flex bf-w-px bf-items-center bf-justify-center bf-bg-neutral-200 after:bf-absolute after:bf-inset-y-0 after:bf-left-1/2 after:bf-w-1 after:bf--translate-x-1/2 focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 focus-visible:bf-ring-offset-1 data-[panel-group-direction=vertical]:bf-h-px data-[panel-group-direction=vertical]:bf-w-full data-[panel-group-direction=vertical]:after:bf-left-0 data-[panel-group-direction=vertical]:after:bf-h-1 data-[panel-group-direction=vertical]:after:bf-w-full data-[panel-group-direction=vertical]:after:bf--translate-y-1/2 data-[panel-group-direction=vertical]:after:bf-translate-x-0 [&[data-panel-group-direction=vertical]>div]:bf-rotate-90 dark:bf-bg-neutral-800 dark:focus-visible:bf-ring-neutral-300",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="bf-z-10 bf-flex bf-h-4 bf-w-3 bf-items-center bf-justify-center bf-rounded-sm bf-border bf-border-neutral-200 bf-bg-neutral-200 dark:bf-border-neutral-800 dark:bf-bg-neutral-800">
        <GripVertical className="bf-h-2.5 bf-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
