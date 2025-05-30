"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/editor/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("bf-grid bf-gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "bf-aspect-square bf-h-4 bf-w-4 bf-rounded-full bf-border bf-border-neutral-200 bf-border-neutral-900 bf-text-neutral-900 bf-shadow focus:bf-outline-none focus-visible:bf-ring-1 focus-visible:bf-ring-neutral-950 disabled:bf-cursor-not-allowed disabled:bf-opacity-50 dark:bf-border-neutral-800 dark:bf-border-neutral-50 dark:bf-text-neutral-50 dark:focus-visible:bf-ring-neutral-300",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="bf-flex bf-items-center bf-justify-center">
        <Circle className="bf-h-3.5 bf-w-3.5 bf-fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
