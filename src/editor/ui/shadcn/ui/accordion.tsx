import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/editor/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("bf-border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="bf-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "bf-flex bf-flex-1 bf-items-center bf-justify-between bf-py-4 bf-text-sm bf-font-medium bf-transition-all hover:bf-underline bf-text-left [&[data-state=open]>svg]:bf-rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="bf-h-4 bf-w-4 bf-shrink-0 bf-text-neutral-500 bf-transition-transform bf-duration-200 dark:bf-text-neutral-400" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="bf-overflow-hidden bf-text-sm data-[state=closed]:bf-animate-accordion-up data-[state=open]:bf-animate-accordion-down"
    {...props}
  >
    <div className={cn("bf-pb-4 bf-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
