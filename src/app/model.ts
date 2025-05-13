import { initReactI18next } from "react-i18next";

import { createI18nextIntegration } from "@withease/i18next";
import { ru, kk } from "date-fns/locale";
import { sample, createEvent, createStore } from "effector";
import i18n from "i18next";

import kzLocale from "@/shared/lib/locales/kz.json";
import ruLocale from "@/shared/lib/locales/ru.json";
import { router, history } from "@/shared/routing/shared";

export const appStarted = createEvent();

const resources = {
  ru: {
    translation: ruLocale,
  },
  kz: {
    translation: kzLocale,
  },
};

const $i18nextInstance = createStore(
  i18n
    .createInstance({
      resources,
      lng: "ru",
      interpolation: {
        escapeValue: false,
      },
    })
    .use(initReactI18next),
  {
    serialize: "ignore",
  },
);

export const { $t, $language, changeLanguageFx, $isReady } =
  createI18nextIntegration({
    instance: $i18nextInstance,
    setup: appStarted,
  });

export const $dateFnsLocale = $language.map((language) => {
  switch (language) {
    case "kz":
      return kk;
    case "ru":
      return ru;
    default:
      return ru;
  }
});

sample({
  source: $isReady,
  fn: () => history,
  target: router.setHistory,
});
