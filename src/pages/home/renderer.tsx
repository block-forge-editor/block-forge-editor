import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Counter } from "@/entities/counter-button/ui";

export const Renderer: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="mt-20 text-3xl text-center max-w-[80%] font-semibold">
        {t("WELCOME")}
      </h1>

      <Counter />
    </>
  );
};
