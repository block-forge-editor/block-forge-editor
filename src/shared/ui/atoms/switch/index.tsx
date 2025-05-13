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
      <div className="min-w-[44px] h-6 rounded-3xl bg-slate-200 flex items-center justify-center">
        <Loader className="size-4 animate-spin" />
      </div>
    );
  }

  return <ShaSwitch {...props} />;
};
