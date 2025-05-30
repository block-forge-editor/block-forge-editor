import { FC } from "react";

import { SwitchProps } from "@radix-ui/react-switch";
import { Loader } from "lucide-react";

import { Switch as ShaSwitch } from "../../shadcn";

type TProps = {
  isLoading?: boolean;
} & SwitchProps;

export const Switch: FC<TProps> = ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      <div className="bf-min-w-[44px] bf-h-6 bf-rounded-3xl bf-bg-neutral-200 bf-flex bf-items-center bf-justify-center">
        <Loader className="bf-size-4 bf-animate-spin" />
      </div>
    );
  }

  return <ShaSwitch {...props} />;
};
