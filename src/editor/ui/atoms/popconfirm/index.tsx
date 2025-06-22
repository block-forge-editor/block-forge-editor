import { FC, JSX } from "react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { AlertCircle } from "lucide-react";

import { Button } from "@/editor/ui/atoms";

type TProps = {
  title: string;
  okText?: string;
  cancelText?: string;
  children: JSX.Element;
  onOkClick: VoidFunction;
  side?: "top" | "left" | "right" | "bottom";
};

export const Popconfirm: FC<TProps> = ({
  side,
  title,
  children,
  onOkClick,
  okText = "Да",
  cancelText = "Нет",
}) => (
  <Popover>
    <PopoverTrigger asChild>{children}</PopoverTrigger>
    <PopoverContent side={side}>
      <div className="bf-border bf-p-2 bf-rounded-md bf-bg-white bf-ml-2 bf-shadow-md">
        <div className="bf-flex bf-items-center bf-mb-2 bf-gap-x-2">
          <AlertCircle className="bf-size-4 bf-text-yellow-500" />
          <p className="bf-text-sm">{title}</p>
        </div>
        <div className="bf-flex bf-items-center bf-justify-end bf-gap-x-2">
          <PopoverClose type="button">
            <Button
              variant="outline"
              className="bf-text-xs bf-h-[unset] bf-py-1 bf-px-2"
            >
              {cancelText}
            </Button>
          </PopoverClose>
          <Button
            type="button"
            className="bf-text-xs bf-h-[unset] bf-py-1 bf-px-2"
            onClick={(e) => {
              e.stopPropagation();
              onOkClick();
            }}
          >
            {okText}
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
