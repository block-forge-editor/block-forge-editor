import { FC } from "react";

import {
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  Dialog as ShaDialog,
} from "../../shadcn/ui";

type Component = JSX.Element;

type TProps = {
  isOpen: boolean;
  Footer?: Component;
  className?: string;
  children: Component;

  description?: string;
  onClose?: VoidFunction;

  title?: string | Component;
};

export const Dialog: FC<TProps> = ({
  title,
  isOpen,
  Footer,
  onClose,
  children,
  className,
  description,
}) => {
  return (
    <ShaDialog open={isOpen}>
      <DialogContent
        onClose={onClose}
        className={className ?? "sm:max-w-[425px]"}
      >
        <DialogHeader>
          {title ? (
            <DialogTitle className="sm:max-w-[425px]">{title}</DialogTitle>
          ) : (
            <DialogTitle className="hidden">Dialog</DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {Footer && <DialogFooter>{Footer}</DialogFooter>}
      </DialogContent>
    </ShaDialog>
  );
};
