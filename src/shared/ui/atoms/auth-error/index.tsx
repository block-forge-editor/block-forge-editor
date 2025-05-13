import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ShieldX } from "lucide-react";

import { RoundedBox } from "../rounded-box";

export const AuthError: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 w-full h-[100vh] bg-gradient-to-t from-brand to-slate-900 flex items-center justify-center">
      <RoundedBox className="w-[90%] px-8 py-16 flex flex-col items-center justify-center text-center">
        <ShieldX className="size-12 mb-4 text-red-500" />
        <h1 className="text-2xl font-semibold">{t("AUTH.TITLE")}</h1>
        <div className="text-gray-500 my-8">
          <p>{t("AUTH.SUBTITLE_1")}</p>
          <p>{t("AUTH.SUBTITLE_2")}</p>
        </div>
        <a href="/error" className="underline text-brand">
          {t("TO_HOME")}
        </a>
      </RoundedBox>
    </div>
  );
};
