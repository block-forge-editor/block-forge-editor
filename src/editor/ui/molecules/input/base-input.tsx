import { FC } from "react";

import { Loader } from "lucide-react";

import { Label } from "../../atoms/form";
import { Input as ShaInput } from "../../shadcn";
import { TProps } from "./types";

import { cn } from "@/editor/lib/font-manager";

export const BaseInput: FC<TProps> = ({
  label,
  isError,
  errorMessage,
  isLoading,
  ...props
}) => {
  return (
    <div className="bf-w-full bf-relative">
      {label && <Label className="bf-mb-2">{label}</Label>}
      <ShaInput
        className={cn(isError && "bf-border-red-400")}
        {...props}
      ></ShaInput>
      {errorMessage && (
        <div className="bf-text-xs bf-text-red-400 bf-mt-1">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="bf-w-full bf-h-full bf-absolute bf-flex bf-items-center bf-justify-center bf-bg-white/20 bf-inset-0 bf-px-4">
          <Loader className="bf-size-4 bf-animate-spin bf-text-brand bf-mt-3 bf-ml-auto" />
        </div>
      )}
    </div>
  );
};
