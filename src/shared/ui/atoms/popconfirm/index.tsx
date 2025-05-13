import { FC } from "react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { AlertCircle } from "lucide-react";

import { Button } from "@/shared/ui/atoms";

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
      <div className="border p-2 rounded-md bg-white ml-2 shadow-md">
        <div className="flex items-center mb-2 gap-x-2">
          <AlertCircle className="w-4 h-4 text-yellow-500" />
          <p className="text-sm">{title}</p>
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <PopoverClose type="button">
            <Button variant="outline" className="text-xs h-[unset] py-1 px-2">
              {cancelText}
            </Button>
          </PopoverClose>
          <Button
            type="button"
            className="text-xs h-[unset] py-1 px-2"
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
