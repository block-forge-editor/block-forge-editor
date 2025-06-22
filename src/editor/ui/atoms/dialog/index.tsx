import { FC, JSX } from "react";

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

  title?: string | Component;
};

export const Dialog: FC<TProps> = ({
  title,
  isOpen,
  Footer,
  children,
  className,
  description,
}) => {
  return (
    <ShaDialog open={isOpen}>
      <DialogContent className={className ?? "bf-sm:bf-max-w-[425px]"}>
        <DialogHeader>
          {title ? (
            <DialogTitle className="bf-sm:bf-max-w-[425px]">
              {title}
            </DialogTitle>
          ) : (
            <DialogTitle className="bf-hidden">Dialog</DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {Footer && <DialogFooter>{Footer}</DialogFooter>}
      </DialogContent>
    </ShaDialog>
  );
};
