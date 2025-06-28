import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/editor/lib/font-manager";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "bf-flex bf-h-9 bf-w-full bf-items-center bf-justify-between bf-whitespace-nowrap bf-rounded-md bf-border bf-border-neutral-200 bf-bg-transparent bf-px-3 bf-py-2 bf-text-sm bf-shadow-sm bf-ring-offset-white data-[placeholder]:bf-text-neutral-500 focus:bf-outline-none focus:bf-ring-1 focus:bf-ring-neutral-950 disabled:bf-cursor-not-allowed disabled:bf-opacity-50 [&>span]:bf-line-clamp-1 dark:bf-border-neutral-800 dark:bf-ring-offset-neutral-950 dark:data-[placeholder]:bf-text-neutral-400 dark:focus:bf-ring-neutral-300",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="bf-h-4 bf-w-4 bf-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "bf-flex bf-cursor-default bf-items-center bf-justify-center bf-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="bf-h-4 bf-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "bf-flex bf-cursor-default bf-items-center bf-justify-center bf-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="bf-h-4 bf-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "bf-relative bf-z-50 bf-max-h-[--radix-select-content-available-height] bf-min-w-[8rem] bf-overflow-y-auto bf-overflow-x-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-text-neutral-950 bf-shadow-md data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-select-content-transform-origin] dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
        position === "popper" &&
          "data-[side=bottom]:bf-translate-y-1 data-[side=left]:bf--translate-x-1 data-[side=right]:bf-translate-x-1 data-[side=top]:bf--translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "bf-p-1",
          position === "popper" &&
            "bf-h-[var(--radix-select-trigger-height)] bf-w-full bf-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("bf-px-2 bf-py-1.5 bf-text-sm bf-font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-w-full bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-2 bf-pr-8 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    {...props}
  >
    <span className="bf-absolute bf-right-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="bf-h-4 bf-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "bf--mx-1 bf-my-1 bf-h-px bf-bg-neutral-100 dark:bf-bg-neutral-800",
      className,
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
