import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/editor/lib/font-manager";

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
    <SliderPrimitive.Track className="bf-relative bf-h-1.5 bf-w-full bf-grow bf-overflow-hidden bf-rounded-full bf-bg-primary/20">
      <SliderPrimitive.Range className="bf-absolute bf-h-full bf-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="bf-block bf-h-4 bf-w-4 bf-rounded-full bf-border bf-border-primary/50 bf-bg-background bf-shadow bf-transition-colors focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-ring disabled:bf-pointer-events-none disabled:bf-opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
