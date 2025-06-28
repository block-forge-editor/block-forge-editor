"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/editor/lib/font-manager";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "bf-fixed bf-inset-0 bf-z-50 bf-bg-black/80 bf- data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "bf-fixed bf-left-[50%] bf-top-[50%] bf-z-50 bf-grid bf-w-full bf-max-w-lg bf-translate-x-[-50%] bf-translate-y-[-50%] bf-gap-4 bf-border bf-border-neutral-200 bf-bg-white bf-p-6 bf-shadow-lg bf-duration-200 data-[state=open]:bf-animate-in data-[state=closed]:bf-animate-out data-[state=closed]:bf-fade-out-0 data-[state=open]:bf-fade-in-0 data-[state=closed]:bf-zoom-out-95 data-[state=open]:bf-zoom-in-95 data-[state=closed]:bf-slide-out-to-left-1/2 data-[state=closed]:bf-slide-out-to-top-[48%] data-[state=open]:bf-slide-in-from-left-1/2 data-[state=open]:bf-slide-in-from-top-[48%] sm:bf-rounded-lg dark:bf-border-neutral-800 dark:bf-bg-neutral-950",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="bf-absolute bf-right-4 bf-top-4 bf-rounded-sm bf-opacity-70 bf-ring-offset-white bf-transition-opacity hover:bf-opacity-100 focus:bf-outline-none focus:bf-ring-2 focus:bf-ring-neutral-950 focus:bf-ring-offset-2 disabled:bf-pointer-events-none data-[state=open]:bf-bg-neutral-100 data-[state=open]:bf-text-neutral-500 dark:bf-ring-offset-neutral-950 dark:focus:bf-ring-neutral-300 dark:data-[state=open]:bf-bg-neutral-800 dark:data-[state=open]:bf-text-neutral-400">
        <X className="bf-h-4 bf-w-4" />
        <span className="bf-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bf-flex bf-flex-col bf-space-y-1.5 bf-text-center sm:bf-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "bf-text-lg bf-font-semibold bf-leading-none bf-tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "bf-text-sm bf-text-neutral-500 dark:bf-text-neutral-400",
      className,
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
