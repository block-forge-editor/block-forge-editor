"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/editor/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "bf-flex bf-cursor-default bf-select-none bf-items-center bf-gap-2 bf-rounded-sm bf-px-2 bf-py-1.5 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 data-[state=open]:bf-bg-neutral-100 [&_svg]:bf-pointer-events-none [&_svg]:bf-size-4 [&_svg]:bf-shrink-0 dark:focus:bf-bg-neutral-800 dark:data-[state=open]:bf-bg-neutral-800",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="bf-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "bf-z-50 bf-min-w-[8rem] bf-overflow-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-text-neutral-950 bf-shadow-lg data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-dropdown-menu-content-transform-origin] dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bf-z-50 bf-max-h-[var(--radix-dropdown-menu-content-available-height)] bf-min-w-[8rem] bf-overflow-y-auto bf-overflow-x-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-text-neutral-950 bf-shadow-md dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
        "data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-dropdown-menu-content-transform-origin]",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-gap-2 bf-rounded-sm bf-px-2 bf-py-1.5 bf-text-sm bf-outline-none bf-transition-colors focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 [&>svg]:bf-size-4 [&>svg]:bf-shrink-0 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-8 bf-pr-2 bf-text-sm bf-outline-none bf-transition-colors focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="bf-absolute bf-left-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="bf-h-4 bf-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-8 bf-pr-2 bf-text-sm bf-outline-none bf-transition-colors focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    {...props}
  >
    <span className="bf-absolute bf-left-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="bf-h-2 bf-w-2 bf-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "bf-px-2 bf-py-1.5 bf-text-sm bf-font-semibold",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "bf--mx-1 bf-my-1 bf-h-px bf-bg-neutral-100 dark:bf-bg-neutral-800",
      className,
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "bf-ml-auto bf-text-xs bf-tracking-widest bf-opacity-60",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
