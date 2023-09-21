import i18next from "i18next";
// english translations
import enLogin from "../../Translations/en/login.json";
import enFooter from "../../Translations/en/footer.json";
import enNotFound from "../../Translations/en/notfound.json";
import enRegister from "../../Translations/en/register.json";
import enGender from "../../Translations/en/gender.json";
import enRecovery from "../../Translations/en/recovery.json";
// polish translations
import plLogin from "../../Translations/pl/login.json";
import plFooter from "../../Translations/pl/footer.json";
import plNotFound from "../../Translations/pl/notfound.json";
import plRegister from "../../Translations/pl/register.json";
import plGender from "../../Translations/pl/gender.json";
import plRecovery from "../../Translations/pl/recovery.json";

export const i18nInitializer = () => {
  const language = localStorage.getItem('language') == null ? 'en' : localStorage.getItem('language');

  return i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: language,                              // language to use
    resources: {
      en: {
        login: enLogin,
        footer: enFooter,
        notfound: enNotFound,
        register: enRegister,
        gender: enGender,
        recovery: enRecovery,
      },
      pl: {
        login: plLogin,
        footer: plFooter,
        notfound: plNotFound,
        register: plRegister,
        gender: plGender,
        recovery: plRecovery,
      }
    }
  });
}