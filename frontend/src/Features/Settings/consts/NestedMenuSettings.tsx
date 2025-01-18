import {
  Icon,
  IconBellRinging,
  IconBlocks,
  IconDatabase,
  IconHelp,
  IconHomeCog,
  IconLanguage,
  IconMessageChatbot,
  IconProps,
  IconShieldLock,
  IconSpy,
  IconUser,
  IconWand
} from "@tabler/icons-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";
import {MyAccount} from "../components/Menu/MyAccount";
import {Privacy} from "../components/Menu/Privacy";
import {Security} from "../components/Menu/Security";
import {Notifications} from "../components/Menu/Notifications";
import {Data} from "../components/Menu/Data";
import {Help} from "../components/Menu/Help";
import {General} from "../components/Menu/General";
import {Apperance} from "../components/Menu/Apperance";
import {Accessibility} from "../components/Menu/Accessibility";
import {Language} from "../components/Menu/Language";
import {About} from "../components/Menu/About";
import {useTranslation} from "react-i18next";

type NestedMenuSettingsType = {
  uuid: number;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  label: string;
  description?: string;
}

// Contains menu items for profile settings
export const UserSettingsMenu: () => NestedMenuSettingsType[] = () => {
  const {t} = useTranslation('settings');

  return ([
    {
      label: t('user.account.label'),
      icon: IconUser,
      description: t('user.account.description'),
      uuid: 0
    },
    {
      label: t('user.privacy.label'),
      icon: IconSpy,
      description: t('user.privacy.description'),
      uuid: 1
    },
    {
      label: t('user.security.label'),
      icon: IconShieldLock,
      description: t('user.security.description'),
      uuid: 2
    },
    {
      label: t('user.notifications.label'),
      icon: IconBellRinging,
      description: t('user.notifications.description'),
      uuid: 3
    },
    {
      label: t('user.personalization.label'),
      icon: IconDatabase,
      description: t('user.personalization.description'),
      uuid: 4
    },
    {
      label: t('user.help.label'),
      icon: IconHelp,
      description: t('user.help.description'),
      uuid: 5
    }
  ] as NestedMenuSettingsType[]);
}

// Contains menu items for privacy settings
export const AppSettingsMenu: () => NestedMenuSettingsType[] = () => {
  const {t} = useTranslation('settings');

  return ([
    {
      label: t('app.general.label'),
      icon: IconHomeCog,
      description: t('app.general.description'),
      uuid: 6
    },
    {
      label: t('app.appearance.label'),
      icon: IconWand,
      description: t('app.appearance.description'),
      uuid: 7
    },
    {
      label: t('app.accessibility.label'),
      icon: IconBlocks,
      description: t('app.accessibility.description'),
      uuid: 8
    },
    {
      label: t('app.language.label'),
      icon: IconLanguage,
      description: t('app.language.description'),
      uuid: 9
    },
    {
      label: t('app.about.label'),
      icon: IconMessageChatbot,
      description: t('app.about.description'),
      uuid: 10
    }
  ] as NestedMenuSettingsType[]);
}

type MenuContentType = {
  uuid: number;
  component: JSX.Element;
}

// All component routes are defined here
export const MenuContent: MenuContentType[] = [
  {
    uuid: 0,
    component: <MyAccount/>
  },
  {
    uuid: 1,
    component: <Privacy/>
  },
  {
    uuid: 2,
    component: <Security/>
  },
  {
    uuid: 3,
    component: <Notifications/>
  },
  {
    uuid: 4,
    component: <Data/>
  },
  {
    uuid: 5,
    component: <Help/>
  },
  {
    uuid: 6,
    component: <General/>
  },
  {
    uuid: 7,
    component: <Apperance/>
  },
  {
    uuid: 8,
    component: <Accessibility/>
  },
  {
    uuid: 9,
    component: <Language/>
  },
  {
    uuid: 10,
    component: <About/>
  }
]