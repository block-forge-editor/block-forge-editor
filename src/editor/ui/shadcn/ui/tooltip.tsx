import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/editor/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bf-z-50 bf-overflow-hidden bf-rounded-md bf-bg-neutral-900 bf-px-3 bf-py-1.5 bf-text-xs bf-text-neutral-50 bf-animate-in bf-fade-in-0 bf-zoom-in-95 data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=closed]:bf-zoom-out-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-tooltip-content-transform-origin] dark:bf-bg-neutral-50 dark:bf-text-neutral-900",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
