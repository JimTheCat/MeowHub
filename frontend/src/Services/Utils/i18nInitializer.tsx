import i18next from "i18next";
// english translations
import enLogin from "../../Translations/en/login.json";
import enFooter from "../../Translations/en/footer.json";
import enNotFound from "../../Translations/en/notfound.json";
// polish translations
import plLogin from "../../Translations/pl/login.json";
import plFooter from "../../Translations/pl/footer.json";
import plNotFound from "../../Translations/pl/notfound.json";

export const i18nInitializer = () => {
  return i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'pl',                              // language to use
    resources: {
      en: {
        login: enLogin,
        footer: enFooter,
        notfound: enNotFound,
      },
      pl: {
        login: plLogin,
        footer: plFooter,
        notfound: plNotFound,
      }
    }
  });
}