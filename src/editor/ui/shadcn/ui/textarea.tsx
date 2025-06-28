import * as React from "react";

import { cn } from "@/editor/lib/font-manager";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "bf-flex bf-min-h-[60px] bf-w-full bf-rounded-md bf-border bf-border-neutral-200 bf-bg-transparent bf-px-3 bf-py-2 bf-text-base bf-shadow-sm placeholder:bf-text-neutral-500 focus-visible:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-cursor-not-allowed disabled:bf-opacity-50 md:bf-text-sm dark:bf-border-neutral-800 dark:placeholder:bf-text-neutral-400 dark:focus-visible:bf-ring-neutral-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
