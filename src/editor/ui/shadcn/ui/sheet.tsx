"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/editor/lib/font-manager";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "bf-fixed bf-inset-0 bf-z-50 bf-bg-black/80 bf- data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "bf-fixed bf-z-50 bf-gap-4 bf-bg-white bf-p-6 bf-shadow-lg bf-transition bf-ease-in-out data-[state=closed]:bf-duration-300 data-[state=open]:bf-duration-500 data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out dark:bf-bg-neutral-950",
  {
    variants: {
      side: {
        top: "bf-inset-x-0 bf-top-0 bf-border-b data-[state=closed]:bf-slide-out-to-top data-[state=open]:bf-slide-in-from-top",
        bottom:
          "bf-inset-x-0 bf-bottom-0 bf-border-t data-[state=closed]:bf-slide-out-to-bottom data-[state=open]:bf-slide-in-from-bottom",
        left: "bf-inset-y-0 bf-left-0 bf-h-full bf-w-3/4 bf-border-r data-[state=closed]:bf-slide-out-to-left data-[state=open]:bf-slide-in-from-left sm:bf-max-w-sm",
        right:
          "bf-inset-y-0 bf-right-0 bf-h-full bf-w-3/4 bf-border-l data-[state=closed]:bf-slide-out-to-right data-[state=open]:bf-slide-in-from-right sm:bf-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="bf-absolute bf-right-4 bf-top-4 bf-rounded-sm bf-opacity-70 bf-ring-offset-white bf-transition-opacity hover:bf-opacity-100 focus:bf-outline-none focus:bf-ring-2 focus:bf-ring-neutral-950 focus:bf-ring-offset-2 disabled:bf-pointer-events-none data-[state=open]:bf-bg-neutral-100 dark:bf-ring-offset-neutral-950 dark:focus:bf-ring-neutral-300 dark:data-[state=open]:bf-bg-neutral-800">
        <X className="bf-h-4 bf-w-4" />
        <span className="bf-sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bf-flex bf-flex-col bf-space-y-2 bf-text-center sm:bf-text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bf-flex bf-flex-col-reverse sm:bf-flex-row sm:bf-justify-end sm:bf-space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "bf-text-lg bf-font-semibold bf-text-neutral-950 dark:bf-text-neutral-50",
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(
      "bf-text-sm bf-text-neutral-500 dark:bf-text-neutral-400",
      className,
    )}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
