import i18next from "i18next";
// english translations
import enCreatePost from "../Translations/en/createPost.json";
import enFriends from "../Translations/en/friends.json";
import enMainPage from "../Translations/en/mainPage.json";
import enMatching from "../Translations/en/matching.json";
import enMessenger from "../Translations/en/messenger.json";
import enRelations from "../Translations/en/relations.json";
import enRoot from "../Translations/en/root.json";
import enSearch from "../Translations/en/search.json";
import enSettings from "../Translations/en/settings.json";
import enProfile from "../Translations/en/profile.json";
import enMultimedia from "../Translations/en/multimedia.json";
import enLogin from "../Translations/en/login.json";
import enFooter from "../Translations/en/footer.json";
import enNotFound from "../Translations/en/notfound.json";
import enRegister from "../Translations/en/register.json";
import enGender from "../Translations/en/gender.json";
import enRecovery from "../Translations/en/recovery.json";
import enPostComponent from "../Translations/en/components/post.json";
import enCookiesComponent from "../Translations/en/components/cookies.json";
import enInvitationComponent from "../Translations/en/components/invitation.json";
// polish translations
import plCreatePost from "../Translations/pl/createPost.json";
import plFriends from "../Translations/pl/friends.json";
import plMainPage from "../Translations/pl/mainPage.json";
import plMatching from "../Translations/pl/matching.json";
import plMessenger from "../Translations/pl/messenger.json";
import plRelations from "../Translations/pl/relations.json";
import plRoot from "../Translations/pl/root.json";
import plSearch from "../Translations/pl/search.json";
import plSettings from "../Translations/pl/settings.json";
import plProfile from "../Translations/pl/profile.json";
import plMultimedia from "../Translations/pl/multimedia.json";
import plLogin from "../Translations/pl/login.json";
import plFooter from "../Translations/pl/footer.json";
import plNotFound from "../Translations/pl/notfound.json";
import plRegister from "../Translations/pl/register.json";
import plGender from "../Translations/pl/gender.json";
import plRecovery from "../Translations/pl/recovery.json";
import plPostComponent from "../Translations/pl/components/post.json";
import plCookiesComponent from "../Translations/pl/components/cookies.json";
import plInvitationComponent from "../Translations/pl/components/invitation.json";

export const i18nInitializer = () => {
  let language = localStorage.getItem('language');
  if (language === null) language = 'en';

  return i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: language,                          // language to use
    resources: {
      en: {
        // =-=-=FEATURE TRANSLATIONS START=-=-=
        createPost: enCreatePost,
        friends: enFriends,
        mainPage: enMainPage,
        matching: enMatching,
        messenger: enMessenger,
        relations: enRelations,
        root: enRoot,
        search: enSearch,
        settings: enSettings,
        profile: enProfile,
        multimedia: enMultimedia,
        login: enLogin,
        footer: enFooter,
        notfound: enNotFound,
        register: enRegister,
        gender: enGender,
        recovery: enRecovery,
        // =-=-=FEATURE TRANSLATIONS END=-=-=
        // =-=-=COMPONENTS TRANSLATIONS START=-=-=
        postComponent: enPostComponent,
        cookiesComponent: enCookiesComponent,
        invitationComponent: enInvitationComponent,
        // =-=-=COMPONENTS TRANSLATIONS END=-=-=
      },
      pl: {
        // =-=-=FEATURE TRANSLATIONS START=-=-=
        createPost: plCreatePost,
        friends: plFriends,
        mainPage: plMainPage,
        matching: plMatching,
        messenger: plMessenger,
        relations: plRelations,
        root: plRoot,
        search: plSearch,
        settings: plSettings,
        profile: plProfile,
        multimedia: plMultimedia,
        login: plLogin,
        footer: plFooter,
        notfound: plNotFound,
        register: plRegister,
        gender: plGender,
        recovery: plRecovery,
        // =-=-=FEATURE TRANSLATIONS END=-=-=
        // =-=-=COMPONENTS TRANSLATIONS START=-=-=
        postComponent: plPostComponent,
        cookiesComponent: plCookiesComponent,
        invitationComponent: plInvitationComponent,
        // =-=-=COMPONENTS TRANSLATIONS END=-=-=
      }
    }
  });
}