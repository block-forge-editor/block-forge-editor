import { FC } from "react";

import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

import { Divider } from "../../atoms/divider";
import { Badge } from "../../shadcn/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../shadcn/ui/tooltip";

type TComponentHeaderProps = {
  title: string;
  tooltipText: string;
  children?: React.ReactNode;
  variant: "primary" | "secondary";
};

export const ComponentHeader: FC<TComponentHeaderProps> = ({
  variant,
  tooltipText,
  title,
  children,
}) => {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-3">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="bg-slate-100 text-slate-700 border border-slate-200 cursor-help"
                >
                  {title}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Название компонента</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-help",
                    variant === "primary"
                      ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                      : "bg-violet-100 text-violet-700 border border-violet-200",
                  )}
                >
                  {variant === "primary" ? "Primary" : "Secondary"}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Вариант компонента</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <AlertCircle className="h-4 w-4 text-slate-400" />
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
