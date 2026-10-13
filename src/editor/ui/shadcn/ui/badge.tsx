import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/font-manager";

const badgeVariants = cva(
  "bf-inline-flex bf-items-center bf-rounded-md bf-border bf-border-border bf-px-2.5 bf-py-0.5 bf-text-xs bf-font-semibold bf-transition-colors focus:bf-outline-none focus:bf-ring-2 focus:bf-ring-ring focus:bf-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bf-border-transparent bf-bg-primary bf-text-primary-foreground bf-shadow hover:bf-bg-primary/80",
        secondary:
          "bf-border-transparent bf-bg-secondary bf-text-secondary-foreground hover:bf-bg-secondary/80",
        destructive:
          "bf-border-transparent bf-bg-destructive bf-text-destructive-foreground bf-shadow hover:bf-bg-destructive/80",
        outline: "bf-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
