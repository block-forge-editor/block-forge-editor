import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/editor/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-px-2 bf-py-1.5 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[state=open]:bf-bg-neutral-100 data-[state=open]:bf-text-neutral-900 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50 dark:data-[state=open]:bf-bg-neutral-800 dark:data-[state=open]:bf-text-neutral-50",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="bf-ml-auto bf-h-4 bf-w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "bf-z-50 bf-min-w-[8rem] bf-overflow-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-text-neutral-950 bf-shadow-lg data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-context-menu-content-transform-origin] dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "bf-z-50 bf-max-h-[--radix-context-menu-content-available-height] bf-min-w-[8rem] bf-overflow-y-auto bf-overflow-x-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-text-neutral-950 bf-shadow-md data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-context-menu-content-transform-origin] dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-px-2 bf-py-1.5 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-8 bf-pr-2 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="bf-absolute bf-left-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="bf-h-4 bf-w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-8 bf-pr-2 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    {...props}
  >
    <span className="bf-absolute bf-left-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="bf-h-4 bf-w-4 bf-fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "bf-px-2 bf-py-1.5 bf-text-sm bf-font-semibold bf-text-neutral-950 dark:bf-text-neutral-50",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "bf--mx-1 bf-my-1 bf-h-px bf-bg-neutral-200 dark:bf-bg-neutral-800",
      className,
    )}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "bf-ml-auto bf-text-xs bf-tracking-widest bf-text-neutral-500 dark:bf-text-neutral-400",
        className,
      )}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
