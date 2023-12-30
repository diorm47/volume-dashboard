import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en_locale } from "./locales/en";
import { ru_locale } from "./locales/ru";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      // navbar
      translation: en_locale,
    },
    ru: {
      translation: ru_locale,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
