import { initReactI18next } from "react-i18next";

import { createI18nextIntegration } from "@withease/i18next";
import { ru, kk } from "date-fns/locale";
import { createEvent, createStore } from "effector";
import i18n from "i18next";

import enLocale from "@/shared/lib/locales/en.json";
import ruLocale from "@/shared/lib/locales/ru.json";

export const appStarted = createEvent();

const resources = {
  ru: {
    translation: ruLocale,
  },
  en: {
    translation: enLocale,
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
