import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/utils";

const toggleVariants = cva(
  "bf-inline-flex bf-items-center bf-justify-center bf-gap-2 bf-rounded-md bf-text-sm bf-font-medium bf-transition-colors hover:bf-bg-neutral-100 hover:bf-text-neutral-500 focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-pointer-events-none disabled:bf-opacity-50 data-[state=on]:bf-bg-neutral-100 data-[state=on]:bf-text-neutral-900 [&_svg]:bf-pointer-events-none [&_svg]:bf-size-4 [&_svg]:bf-shrink-0 dark:hover:bf-bg-neutral-800 dark:hover:bf-text-neutral-400 dark:focus-visible:bf-ring-neutral-300 dark:data-[state=on]:bf-bg-neutral-800 dark:data-[state=on]:bf-text-neutral-50",
  {
    variants: {
      variant: {
        default: "bf-bg-transparent",
        outline:
          "bf-border bf-border-neutral-200 bf-bg-transparent bf-shadow-sm hover:bf-bg-neutral-100 hover:bf-text-neutral-900 dark:bf-border-neutral-800 dark:hover:bf-bg-neutral-800 dark:hover:bf-text-neutral-50",
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
