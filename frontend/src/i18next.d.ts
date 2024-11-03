import 'react-i18next';

// Define the structure of your translation resources
declare module 'react-i18next' {
  interface Resources {
    en: {
      login: typeof import('src/Translations/en/login.json');
      footer: typeof import('src/Translations/en/footer.json');
      notfound: typeof import('src/Translations/en/notfound.json');
      register: typeof import('src/Translations/en/register.json');
      gender: typeof import('src/Translations/en/gender.json');
      recovery: typeof import('src/Translations/en/recovery.json');
    };
    pl: {
      login: typeof import('src/Translations/pl/login.json');
      footer: typeof import('src/Translations/pl/footer.json');
      notfound: typeof import('src/Translations/pl/notfound.json');
      register: typeof import('src/Translations/pl/register.json');
      gender: typeof import('src/Translations/pl/gender.json');
      recovery: typeof import('src/Translations/pl/recovery.json');
    };
  }
}
