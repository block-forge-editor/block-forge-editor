import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/font-manager";

const toggleVariants = cva(
  "bf-inline-flex bf-items-center bf-justify-center bf-gap-2 bf-rounded-md bf-text-sm bf-font-medium bf-transition-colors hover:bf-bg-accent hover:bf-text-muted-foreground focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-ring disabled:bf-pointer-events-none disabled:bf-opacity-50 data-[state=on]:bf-bg-accent data-[state=on]:bf-text-accent-foreground [&_svg]:bf-pointer-events-none [&_svg]:bf-size-4 [&_svg]:bf-shrink-0",
  {
    variants: {
      variant: {
        default: "bf-bg-transparent",
        outline:
          "bf-border bf-border-border bf-bg-transparent bf-shadow-sm hover:bf-bg-accent hover:bf-text-accent-foreground",
      },
      size: {
        default: "bf-h-9 bf-px-2 bf-min-w-9",
        sm: "bf-h-8 bf-px-1.5 bf-min-w-8",
        lg: "bf-h-10 bf-px-2.5 bf-min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
