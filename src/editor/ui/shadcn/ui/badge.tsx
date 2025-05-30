import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/utils";

const badgeVariants = cva(
  "bf-inline-flex bf-items-center bf-rounded-md bf-border bf-border-neutral-200 bf-px-2.5 bf-py-0.5 bf-text-xs bf-font-semibold bf-transition-colors focus:bf-outline-none focus:bf-ring-2 focus:bf-ring-neutral-950 focus:bf-ring-offset-2 dark:bf-border-neutral-800 dark:focus:bf-ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bf-border-transparent bf-bg-neutral-900 bf-text-neutral-50 bf-shadow hover:bf-bg-neutral-900/80 dark:bf-bg-neutral-50 dark:bf-text-neutral-900 dark:hover:bf-bg-neutral-50/80",
        secondary:
          "bf-border-transparent bf-bg-neutral-100 bf-text-neutral-900 hover:bf-bg-neutral-100/80 dark:bf-bg-neutral-800 dark:bf-text-neutral-50 dark:hover:bf-bg-neutral-800/80",
        destructive:
          "bf-border-transparent bf-bg-red-500 bf-text-neutral-50 bf-shadow hover:bf-bg-red-500/80 dark:bf-bg-red-900 dark:bf-text-neutral-50 dark:hover:bf-bg-red-900/80",
        outline: "bf-text-neutral-950 dark:bf-text-neutral-50",
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
