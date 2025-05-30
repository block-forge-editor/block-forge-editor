"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/editor/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "bf-peer bf-inline-flex bf-h-5 bf-w-9 bf-shrink-0 bf-cursor-pointer bf-items-center bf-rounded-full bf-border-2 bf-border-transparent bf-shadow-sm bf-transition-colors focus-visible:bf-outline-none focus-visible:bf-ring-2 focus-visible:bf-ring-neutral-950 focus-visible:bf-ring-offset-2 focus-visible:bf-ring-offset-white disabled:bf-cursor-not-allowed disabled:bf-opacity-50 data-[state=checked]:bf-bg-neutral-900 data-[state=unchecked]:bf-bg-neutral-200 dark:focus-visible:bf-ring-neutral-300 dark:focus-visible:bf-ring-offset-neutral-950 dark:data-[state=checked]:bf-bg-neutral-50 dark:data-[state=unchecked]:bf-bg-neutral-800",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "bf-pointer-events-none bf-block bf-h-4 bf-w-4 bf-rounded-full bf-bg-white bf-shadow-lg bf-ring-0 bf-transition-transform data-[state=checked]:bf-translate-x-4 data-[state=unchecked]:bf-translate-x-0 dark:bf-bg-neutral-950",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
