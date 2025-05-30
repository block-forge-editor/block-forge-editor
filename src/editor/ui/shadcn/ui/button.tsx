import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/utils";

const buttonVariants = cva(
  "bf-inline-flex bf-items-center bf-justify-center bf-gap-2 bf-whitespace-nowrap bf-rounded-md bf-text-sm bf-font-medium bf-transition-colors focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-pointer-events-none disabled:bf-opacity-50 [&_svg]:bf-pointer-events-none [&_svg]:bf-size-4 [&_svg]:bf-shrink-0 dark:focus-visible:bf-ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bf-bg-neutral-900 bf-text-neutral-50 bf-shadow hover:bf-bg-neutral-900/90 dark:bf-bg-neutral-50 dark:bf-text-neutral-900 dark:hover:bf-bg-neutral-50/90",
        destructive:
          "bf-bg-red-500 bf-text-neutral-50 bf-shadow-sm hover:bf-bg-red-500/90 dark:bf-bg-red-900 dark:bf-text-neutral-50 dark:hover:bf-bg-red-900/90",
        outline:
          "bf-border bf-border-neutral-200 bf-bg-white bf-shadow-sm hover:bf-bg-neutral-100 hover:bf-text-neutral-900 dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:hover:bf-bg-neutral-800 dark:hover:bf-text-neutral-50",
        secondary:
          "bf-bg-neutral-100 bf-text-neutral-900 bf-shadow-sm hover:bf-bg-neutral-100/80 dark:bf-bg-neutral-800 dark:bf-text-neutral-50 dark:hover:bf-bg-neutral-800/80",
        ghost:
          "hover:bf-bg-neutral-100 hover:bf-text-neutral-900 dark:hover:bf-bg-neutral-800 dark:hover:bf-text-neutral-50",
        link: "bf-text-neutral-900 bf-underline-offset-4 hover:bf-underline dark:bf-text-neutral-50",
      },
      size: {
        default: "bf-h-9 bf-px-4 bf-py-2",
        sm: "bf-h-8 bf-rounded-md bf-px-3 bf-text-xs",
        lg: "bf-h-10 bf-rounded-md bf-px-8",
        icon: "bf-h-9 bf-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
