import { FC } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X, ArrowLeft } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerDescription,
  Drawer as ShaDrawer,
} from "@/shared/ui/shadcn";

type TProps = {
  isOpen: boolean;
  fullScreen?: boolean;
  onClose: VoidFunction;
  onBack?: VoidFunction;
  dismissible?: boolean;
  withoutHeader?: boolean;
  footerClassName?: string;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  footer?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
  direction?: "left" | "right" | "bottom";
};

const Title: FC<Pick<TProps, "title">> = ({ title }) =>
  title && (
    <DrawerTitle className="text-xl font-bold text-left dark:text-white text-black">
      {title}
    </DrawerTitle>
  );

const BackButton: FC<Pick<TProps, "title" | "onBack">> = ({
  onBack,
  title,
}) => (
  <button onClick={onBack} className="flex items-center">
    <ArrowLeft className="mr-2 size-6" />
    <Title title={title} />
  </button>
);

export const Drawer: FC<TProps> = ({
  title,
  footer,
  children,
  description,
  isOpen = false,
  footerClassName,
  fullScreen = true,
  dismissible = true,
  onClose = () => null,
  withoutHeader = false,
  onBack,
  direction = "bottom",
}) => {
  const contentClasses =
    direction === "right"
      ? "w-2/3 right-0"
      : direction === "left"
        ? "w-2/3 left-0"
        : "w-full bottom-0";

  return (
    <ShaDrawer
      open={isOpen}
      onClose={onClose}
      direction={direction}
      dismissible={dismissible}
    >
      <DrawerOverlay />
      <DrawerContent className={cn(fullScreen && "h-full", contentClasses)}>
        {withoutHeader ? (
          <VisuallyHidden.Root>
            <DrawerTitle></DrawerTitle>
          </VisuallyHidden.Root>
        ) : (
          <DrawerHeader className="flex justify-between items-center p-4 text-black">
            {onBack ? (
              <BackButton title={title} onBack={onBack} />
            ) : (
              <Title title={title} />
            )}

            <hr />

            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}

            <button type="button" onClick={onClose}>
              <X />
            </button>
          </DrawerHeader>
        )}
        {children}
        {footer && (
          <DrawerFooter className={footerClassName}>{footer}</DrawerFooter>
        )}
      </DrawerContent>
    </ShaDrawer>
  );
};
