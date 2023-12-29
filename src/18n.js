import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav_menu_1: "Review",
        nav_menu_2: "Analysis",
        nav_menu_3: "Investments",
        nav_menu_4: "Rates",
        nav_menu_5: "Transactions",
        nav_menu_6: "Settings",
      },
    },
    ru: {
      translation: {
        nav_menu_1: "Обзор",
        nav_menu_2: "Анализ",
        nav_menu_3: "Инвестиции",
        nav_menu_4: "Тарифы",
        nav_menu_5: "Транзакции",
        nav_menu_6: "Настройки",
      },
    },
  },
  lng: "ru",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
