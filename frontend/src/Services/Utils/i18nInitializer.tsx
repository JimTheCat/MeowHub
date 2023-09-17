import i18next from "i18next";
// english translations
import enLogin from "../../Translations/en/login.json";
import enFooter from "../../Translations/en/footer.json";
// polish translations
import plLogin from "../../Translations/pl/login.json";
import plFooter from "../../Translations/pl/footer.json";

export const i18nInitializer = () => {
  const language = localStorage.getItem('language') == null ? 'en' : localStorage.getItem('language');

  return i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: language,                              // language to use
    resources: {
      en: {
        login: enLogin,
        footer: enFooter,
      },
      pl: {
        login: plLogin,
        footer: plFooter,
      }
    }
  });
}