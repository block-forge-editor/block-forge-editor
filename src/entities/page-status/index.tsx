import { FC } from "react";
import { useTranslation } from "react-i18next";

import { CircleX, FolderSearch } from "lucide-react";

const iconProps = {
  className: "size-24",
  strokeWidth: 1,
};

type TProps = {
  type?: 404 | 500;
};

const OPTIONS = {
  404: {
    title: "PAGE_NOT_FOUND",
    icon: <FolderSearch {...iconProps} />,
    color: "text-brand",
    iconColor: "text-brand/60",
  },
  500: {
    title: "INTERNAL_SERVER_ERROR",
    icon: <CircleX {...iconProps} />,
    color: "text-red-400",
    iconColor: "text-red-400/80",
  },
};

export const PageStatus: FC<TProps> = ({ type = 404 }) => {
  const { t } = useTranslation();
  const { title, icon, color, iconColor } = OPTIONS[type];

  return (
    <div className="flex flex-col items-center justify-center gap-y-12">
      <div className="w-full flex flex-col items-center justify-center gap-y-2">
        <h1 className={`font-semibold text-3xl ${color}`}>{type}</h1>
        <p className="text-lg">{t(title)}</p>
        <a href="" className={`underline ${color}`}>
          {t("TO_HOME")}
        </a>
      </div>

      <span className={iconColor}>{icon}</span>
    </div>
  );
};
