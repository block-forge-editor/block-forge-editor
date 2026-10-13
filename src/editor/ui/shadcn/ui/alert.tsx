import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/editor/lib/font-manager";

const alertVariants = cva(
  "bf-relative bf-w-full bf-rounded-lg bf-border bf-border-border bf-px-4 bf-py-3 bf-text-sm [&>svg+div]:bf-translate-y-[-3px] [&>svg]:bf-absolute [&>svg]:bf-left-4 [&>svg]:bf-top-4 [&>svg]:bf-text-foreground [&>svg~*]:bf-pl-7",
  {
    variants: {
      variant: {
        default: "bf-bg-background bf-text-foreground",
        destructive:
          "bf-border-destructive/50 bf-text-destructive [&>svg]:bf-text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "bf-mb-1 bf-font-medium bf-leading-none bf-tracking-tight",
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bf-text-sm [&_p]:bf-leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
