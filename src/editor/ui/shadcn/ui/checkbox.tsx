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
      "bf-peer bf-h-4 bf-w-4 bf-shrink-0 bf-rounded-sm bf-border bf-border-primary bf-shadow focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-ring disabled:bf-cursor-not-allowed disabled:bf-opacity-50 data-[state=checked]:bf-bg-primary data-[state=checked]:bf-text-primary-foreground",
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
