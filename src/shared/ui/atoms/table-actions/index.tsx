import { FC } from "react";

import { MoreHorizontal } from "lucide-react";

import { TChildren } from "@/shared/types/common";
import { Button } from "@/shared/ui/shadcn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/shadcn/ui/dropdown-menu";

type TProps = {
  children: TChildren;
};

export const TableActions: FC<TProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <div className="flex items-center justify-end w-full">
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0 rounded-full">
            <span className="sr-only">Открыть меню</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        align="end"
        className="bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
