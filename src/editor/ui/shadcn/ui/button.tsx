import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/font-manager";

const buttonVariants = cva(
  "bf-inline-flex bf-items-center bf-justify-center bf-gap-2 bf-whitespace-nowrap bf-rounded-md bf-text-sm bf-font-medium bf-transition-colors focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-ring disabled:bf-pointer-events-none disabled:bf-opacity-50 [&_svg]:bf-pointer-events-none [&_svg]:bf-size-4 [&_svg]:bf-shrink-0",
  {
    variants: {
      variant: {
        default:
          "bf-bg-primary bf-text-primary-foreground bf-shadow hover:bf-bg-primary/90",
        destructive:
          "bf-bg-destructive bf-text-destructive-foreground bf-shadow-sm hover:bf-bg-destructive/90",
        outline:
          "bf-border bf-border-border bf-bg-background bf-shadow-sm hover:bf-bg-accent hover:bf-text-accent-foreground",
        secondary:
          "bf-bg-secondary bf-text-secondary-foreground bf-shadow-sm hover:bf-bg-secondary/80",
        ghost: "hover:bf-bg-accent hover:bf-text-accent-foreground",
        link: "bf-text-foreground bf-underline-offset-4 hover:bf-underline",
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
