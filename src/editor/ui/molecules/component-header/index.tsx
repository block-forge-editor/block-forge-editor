import { FC } from "react";

import { AlertCircle } from "lucide-react";

import { Divider } from "../../atoms/divider";
import { Badge } from "../../shadcn/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../shadcn/ui/tooltip";
import { cn } from "@/editor/lib/utils";

type TComponentHeaderProps = {
  title: string;
  tooltipText: string;
  children?: React.ReactNode;
};

export const ComponentHeader: FC<TComponentHeaderProps> = ({
  tooltipText,
  title,
  children,
}) => {
  return (
    <>
      <div className="bf-flex bf-justify-between bf-items-center bf-gap-4 bf-mb-3">
        <div className="bf-flex bf-items-center bf-space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="bf-bg-slate-100 bf-text-slate-700 bf-border bf-border-slate-200 bf-cursor-help"
                >
                  {title}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Component name</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="bf-flex bf-items-center bf-gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bf-cursor-help">
                  <AlertCircle className="bf-h-4 bf-w-4 bf-text-slate-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {children}
        </div>
      </div>
      <Divider dashed />
    </>
  );
};
