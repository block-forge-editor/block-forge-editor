import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ChevronUp } from "lucide-react";

import { Button } from "../../atoms/button";
import { ButtonProps } from "../../shadcn";

type TProps = {
  isOpen: boolean;
  options?: number;
} & ButtonProps;

export const CollapseButton: FC<TProps> = ({ isOpen, options, ...props }) => {
  const { t } = useTranslation();

  return (
    <Button {...props}>
      <div className="flex items-center gap-x-2">
        <p>{t(isOpen ? "HIDE" : "SHOW_MORE")}</p>
        {Boolean(options && !isOpen) && <p>({options})</p>}
        <ChevronUp
          className={`size-4 transition-all ${isOpen ? "" : "rotate-180"}`}
        />
      </div>
    </Button>
  );
};
