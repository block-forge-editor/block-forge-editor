import { FC, SyntheticEvent } from "react";

import { useUnit } from "effector-react";
import { Copy } from "lucide-react";

import { openSuccessToast } from "../../atoms";
import { Button } from "../../atoms/button";
import { Label } from "../../atoms/form";
import { TProps } from "./types";

export const ReadOnlyInput: FC<TProps> = ({ value, label, defaultValue }) => {
  const presentValue = value ?? defaultValue;
  const openToast = useUnit(openSuccessToast);

  const handleCopyValue = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (presentValue) {
      void navigator.clipboard.writeText(String(presentValue));
      openToast("Значение скопировано");
    }
  };

  return (
    <div className="w-full">
      {label && <Label className="mb-2">{label}</Label>}
      <div className="p-2 flex items-center justify-between border border-dashed border-gray-200 rounded-md">
        <p className="text-sm mt-0.5 pl-1">
          {presentValue !== "" ? presentValue : "Не указано"}
        </p>
        {Boolean(presentValue) && (
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleCopyValue}
            className="p-0 border-none h-4 w-4 hover:scale-110 hover:bg-transparent transition-all"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
