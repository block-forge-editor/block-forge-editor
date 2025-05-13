import { FC } from "react";

import { cn } from "@/shared/lib/utils";

type TProps = {
  className?: string;
  itemClassname?: string;
  labelClassName?: string;
  valueClassName?: string;
  variant?: "ordered" | "unordered";
  items: {
    label?: string | JSX.Element;
    value?: string | JSX.Element;
  }[];
};

export const List: FC<TProps> = ({
  items,
  variant,
  className,
  labelClassName,
  valueClassName,
  itemClassname,
}) => {
  if (variant === "ordered") {
    return (
      <ol className={cn("flex flex-col gap-1", className)}>
        {items.map((item, index) => (
          <li key={index}>
            {item.label && (
              <span className="text-slate-500 mr-2">{item.label}</span>
            )}
            {item.value && <span className="font-medium">{item.value}</span>}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {items.map((item, index) => (
        <li key={index} className={itemClassname}>
          {item.label && (
            <span className={cn("text-slate-500 mr-2", labelClassName)}>
              {item.label}
            </span>
          )}
          {item.value && (
            <span className={cn("font-medium", valueClassName)}>
              {item.value}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
