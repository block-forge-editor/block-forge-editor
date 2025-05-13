import { FC } from "react";

import { Loader } from "lucide-react";

import { Label } from "../../atoms/form";
import { Input as ShaInput } from "../../shadcn";
import { TProps } from "./types";

import { cn } from "@/shared/lib/utils";

export const BaseInput: FC<TProps> = ({
  label,
  isError,
  errorMessage,
  isLoading,
  ...props
}) => {
  return (
    <div className="w-full relative">
      {label && <Label className="mb-2">{label}</Label>}
      <ShaInput
        className={cn(isError && "border-red-400")}
        {...props}
      ></ShaInput>
      {errorMessage && (
        <div className="text-xs text-red-400 mt-1">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="w-full h-full absolute flex items-center justify-center bg-white/20 inset-0 px-4">
          <Loader className="size-4 animate-spin text-brand mt-3 ml-auto" />
        </div>
      )}
    </div>
  );
};
