import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/editor/lib/utils";

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "bf-flex bf-h-9 bf-items-center bf-space-x-1 bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-shadow-sm dark:bf-border-neutral-800 dark:bf-bg-neutral-950",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-px-3 bf-py-1 bf-text-sm bf-font-medium bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[state=open]:bf-bg-neutral-100 data-[state=open]:bf-text-neutral-900 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50 dark:data-[state=open]:bf-bg-neutral-800 dark:data-[state=open]:bf-text-neutral-50",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "bf-z-50 bf-min-w-[8rem] bf-overflow-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-text-neutral-950 bf-shadow-lg data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-menubar-content-transform-origin] dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bf-z-50 bf-min-w-[12rem] bf-overflow-hidden bf-rounded-md bf-border bf-border-neutral-200 bf-bg-white bf-p-1 bf-text-neutral-950 bf-shadow-md data-[state=open]:bf-animate-in data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[side=bottom]:bf-slide-in-from-top-2 data-[side=left]:bf-slide-in-from-right-2 data-[side=right]:bf-slide-in-from-left-2 data-[side=top]:bf-slide-in-from-bottom-2 bf-origin-[--radix-menubar-content-transform-origin] dark:bf-border-neutral-800 dark:bf-bg-neutral-950 dark:bf-text-neutral-50",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-px-2 bf-py-1.5 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-8 bf-pr-2 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="bf-absolute bf-left-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="bf-h-4 bf-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "bf-relative bf-flex bf-cursor-default bf-select-none bf-items-center bf-rounded-sm bf-py-1.5 bf-pl-8 bf-pr-2 bf-text-sm bf-outline-none focus:bf-bg-neutral-100 focus:bf-text-neutral-900 data-[disabled]:bf-pointer-events-none data-[disabled]:bf-opacity-50 dark:focus:bf-bg-neutral-800 dark:focus:bf-text-neutral-50",
      className,
    )}
    {...props}
  >
    <span className="bf-absolute bf-left-2 bf-flex bf-h-3.5 bf-w-3.5 bf-items-center bf-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="bf-h-4 bf-w-4 bf-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "bf-px-2 bf-py-1.5 bf-text-sm bf-font-semibold",
      inset && "bf-pl-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(
      "bf--mx-1 bf-my-1 bf-h-px bf-bg-neutral-100 dark:bf-bg-neutral-800",
      className,
    )}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
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
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
