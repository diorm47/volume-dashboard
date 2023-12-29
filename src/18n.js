import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      // navbar
      translation: {
        nav_menu_1: "Review",
        nav_menu_2: "Analysis",
        nav_menu_3: "Investments",
        nav_menu_4: "Rates",
        nav_menu_5: "Transactions",
        nav_menu_6: "Settings",
        nav_menu_7: "Profile",
        nav_menu_8: "Security",
        nav_menu_9: "API connection",
        nav_menu_10: "Explore",
        nav_menu_11: "Knowledge base",
        nav_menu_12: "Privacy Policy",
        nav_menu_13: "Client Agreement",
        nav_menu_14: "Referral program",
        nav_menu_15: "Logout",
        // reviews
        rev_1: "Review",
        rev_2: "Balance",
        rev_3: "Main account",
        rev_4: "PnL for today",
        rev_5: "Order history",
        rev_6: "A list of the last 10 orders is displayed here",
        rev_7: "No order history",
      },
    },
    ru: {
      translation: {
        // navbar
        nav_menu_1: "Обзор",
        nav_menu_2: "Анализ",
        nav_menu_3: "Инвестиции",
        nav_menu_4: "Тарифы",
        nav_menu_5: "Транзакции",
        nav_menu_6: "Настройки",
        nav_menu_7: "Профиль",
        nav_menu_8: "Безопасность",
        nav_menu_9: "Подключение API",
        nav_menu_10: "Изучить",
        nav_menu_11: "База знаний",
        nav_menu_12: "Политика конфиденциальности",
        nav_menu_13: "Клиентское соглашение",
        nav_menu_14: "Реферальная программа",
        nav_menu_15: "Выйти",
        // reviews
        rev_1: "Обзор",
        rev_2: "Баланс",
        rev_3: "Основной аккаунт",
        rev_4: "PnL за сегодня",
        rev_5: "История ордеров",
        rev_6: "Здесь отображается список последних 10 ордеров",
        rev_7: "Нет истории ордеров",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
