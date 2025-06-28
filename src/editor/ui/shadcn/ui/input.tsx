import * as React from "react";

import { cn } from "@/editor/lib/font-manager";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bf-flex bf-h-9 bf-w-full bf-rounded-md bf-border bf-border-neutral-200 bf-bg-transparent bf-px-3 bf-py-1 bf-text-base bf-shadow-sm bf-transition-colors file:bf-border-0 file:bf-bg-transparent file:bf-text-sm file:bf-font-medium file:bf-text-neutral-950 placeholder:bf-text-neutral-500 focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-cursor-not-allowed disabled:bf-opacity-50 md:bf-text-sm dark:bf-border-neutral-800 dark:file:bf-text-neutral-50 dark:placeholder:bf-text-neutral-400 dark:focus-visible:bf-ring-neutral-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
