import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/editor/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-w-full bf-touch-none bf-select-none bf-items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bf-relative bf-h-1.5 bf-w-full bf-grow bf-overflow-hidden bf-rounded-full bf-bg-neutral-900/20 dark:bf-bg-neutral-50/20">
      <SliderPrimitive.Range className="bf-absolute bf-h-full bf-bg-neutral-900 dark:bf-bg-neutral-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="bf-block bf-h-4 bf-w-4 bf-rounded-full bf-border bf-border-neutral-200 bf-border-neutral-900/50 bf-bg-white bf-shadow bf-transition-colors focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-pointer-events-none disabled:bf-opacity-50 dark:bf-border-neutral-800 dark:bf-border-neutral-50/50 dark:bf-bg-neutral-950 dark:focus-visible:bf-ring-neutral-300" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
