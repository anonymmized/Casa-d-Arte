// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// импортируем JSON локали прямо бандлом
import ru from "./locales/ru/common.json";
import en from "./locales/en/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { common: ru },
      en: { common: en },
    },
    lng: "ru",            // стартовый язык
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
    react: {
      useSuspense: false, // чтобы не мигало и Header сразу рендерился
    },
  });

export default i18n;
