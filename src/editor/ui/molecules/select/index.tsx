import { FC } from "react";

import { Label } from "../../atoms/form";

import { cn } from "@/editor/lib/utils";
import {
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  Select as ShaSelect,
} from "@/editor/ui/shadcn";

type TProps = {
  value?: string;
  isError?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
  label?: string | number;
  onChange?: (v: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  groups?: {
    id: string;
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
};

export const Select: FC<TProps> = ({
  label,
  value,
  groups,
  options,
  isError,
  onChange,
  placeholder,
  defaultValue,
  errorMessage,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={className}>
      {label && <Label className="mb-2">{label}</Label>}
      <ShaSelect
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        defaultValue={defaultValue}
      >
        <SelectTrigger className={cn(isError && "bf-border-red-400")}>
          <SelectValue
            onClick={(e) => e.stopPropagation()}
            placeholder={<p className="bf-text-gray-400">{placeholder}</p>}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ label, value }, index) => (
              <SelectItem key={index} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>

          {groups?.map(({ id, label, options }) => (
            <SelectGroup key={id}>
              <SelectLabel>{label}</SelectLabel>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </ShaSelect>
      {errorMessage && (
        <div className="bf-text-xs bf-text-red-400 bf-mt-1">{errorMessage}</div>
      )}
    </div>
  );
};
