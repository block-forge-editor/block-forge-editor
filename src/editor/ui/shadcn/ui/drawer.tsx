import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/editor/lib/font-manager";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger: React.ComponentType<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
> = DrawerPrimitive.Trigger;

const DrawerPortal: React.ComponentType<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>
> = DrawerPrimitive.Portal;

const DrawerClose: React.ComponentType<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>
> = DrawerPrimitive.Close;

const DrawerOverlay: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("bf-fixed bf-inset-0 bf-z-50 bf-bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "bf-fixed bf-inset-x-0 bf-bottom-0 bf-z-50 bf-mt-24 bf-flex bf-h-auto bf-flex-col bf-rounded-t-[10px] bf-border bf-border-neutral-200 bf-bg-white dark:bf-border-neutral-800 dark:bf-bg-neutral-950",
        className,
      )}
      {...props}
    >
      <div className="bf-mx-auto bf-mt-4 bf-h-2 bf-w-[100px] bf-rounded-full bf-bg-neutral-100 dark:bf-bg-neutral-800" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bf-grid bf-gap-1.5 bf-p-4 bf-text-center sm:bf-text-left",
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("bf-mt-auto bf-flex bf-flex-col bf-gap-2 bf-p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "bf-text-lg bf-font-semibold bf-leading-none bf-tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(
      "bf-text-sm bf-text-neutral-500 dark:bf-text-neutral-400",
      className,
    )}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
