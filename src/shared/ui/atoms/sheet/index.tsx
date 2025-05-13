import { FC } from "react";

import {
  SheetTitle,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetDescription,
  Sheet as ShaSheet,
} from "@/shared/ui/shadcn";

type TProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  contentClasses?: string;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  footer?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
};

export const Sheet: FC<TProps> = ({
  title,
  footer,
  children,
  description,
  isOpen = false,
  contentClasses,
  onClose = () => null,
}) => {
  return (
    <ShaSheet open={isOpen}>
      <SheetContent
        onClose={onClose}
        className={`sm:max-w-none ${contentClasses}`}
      >
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </ShaSheet>
  );
};
