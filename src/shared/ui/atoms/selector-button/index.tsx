import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../button";

import { TChildren } from "@/shared/types/common";

type TProps = {
  disabled?: boolean;
  isLoading?: boolean;
  buttonText?: string;
  onClick: VoidFunction;
  title?: string | TChildren;
};

export const SelectorButton: FC<TProps> = ({
  onClick,
  title,
  disabled = false,
  isLoading = false,
  buttonText = "CONTINUE",
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white p-4 border-t">
      {typeof title === "string" ? (
        <p className="text-gray-500 text-lg">{title}</p>
      ) : (
        title ?? null
      )}
      <Button
        onClick={onClick}
        className="w-full"
        loading={isLoading}
        disabled={disabled}
      >
        {t(buttonText)}
      </Button>
    </div>
  );
};
