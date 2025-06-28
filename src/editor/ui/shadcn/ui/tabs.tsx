import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/editor/lib/font-manager";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bf-inline-flex bf-h-9 bf-items-center bf-justify-center bf-rounded-lg bf-bg-neutral-100 bf-p-1 bf-text-neutral-500 dark:bf-bg-neutral-800 dark:bf-text-neutral-400",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "bf-inline-flex bf-items-center bf-justify-center bf-whitespace-nowrap bf-rounded-md bf-px-3 bf-py-1 bf-text-sm bf-font-medium bf-ring-offset-white bf-transition-all focus-visible:bf-outline-none focus-visible:bf-ring-2 focus-visible:bf-ring-neutral-950 focus-visible:bf-ring-offset-2 disabled:bf-pointer-events-none disabled:bf-opacity-50 data-[state=active]:bf-bg-white data-[state=active]:bf-text-neutral-950 data-[state=active]:bf-shadow dark:bf-ring-offset-neutral-950 dark:focus-visible:bf-ring-neutral-300 dark:data-[state=active]:bf-bg-neutral-950 dark:data-[state=active]:bf-text-neutral-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "bf-mt-2 bf-ring-offset-white focus-visible:bf-outline-none focus-visible:bf-ring-2 focus-visible:bf-ring-neutral-950 focus-visible:bf-ring-offset-2 dark:bf-ring-offset-neutral-950 dark:focus-visible:bf-ring-neutral-300",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
