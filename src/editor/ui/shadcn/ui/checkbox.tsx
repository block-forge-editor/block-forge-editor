import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/editor/lib/font-manager";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "bf-peer bf-h-4 bf-w-4 bf-shrink-0 bf-rounded-sm bf-border bf-border-neutral-200 bf-border-neutral-900 bf-shadow focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-cursor-not-allowed disabled:bf-opacity-50 data-[state=checked]:bf-bg-neutral-900 data-[state=checked]:bf-text-neutral-50 dark:bf-border-neutral-800 dark:bf-border-neutral-50 dark:focus-visible:bf-ring-neutral-300 dark:data-[state=checked]:bf-bg-neutral-50 dark:data-[state=checked]:bf-text-neutral-900",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "bf-flex bf-items-center bf-justify-center bf-text-current",
      )}
    >
      <Check className="bf-h-4 bf-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
