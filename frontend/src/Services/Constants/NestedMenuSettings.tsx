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
import {MyAccount} from "../../Pages/Settings/Menu/MyAccount";
import {Privacy} from "../../Pages/Settings/Menu/Privacy";
import {Security} from "../../Pages/Settings/Menu/Security";
import {Notifications} from "../../Pages/Settings/Menu/Notifications";
import {Data} from "../../Pages/Settings/Menu/Data";
import {Help} from "../../Pages/Settings/Menu/Help";
import {General} from "../../Pages/Settings/Menu/General";
import {Apperance} from "../../Pages/Settings/Menu/Apperance";
import {Accessibility} from "../../Pages/Settings/Menu/Accessibility";
import {Language} from "../../Pages/Settings/Menu/Language";
import {About} from "../../Pages/Settings/Menu/About";

type NestedMenuSettingsType = {
  uuid: number;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  label: string;
  description?: string;
}

// Contains menu items for profile settings
export const UserSettingsMenu: NestedMenuSettingsType[] = [
  {
    label: "My Account",
    icon: IconUser,
    description: "Change your personal information",
    uuid: 0
  },
  {
    label: "Privacy",
    icon: IconSpy,
    description: "Control your privacy settings",
    uuid: 1
  },
  {
    label: "Security",
    icon: IconShieldLock,
    description: "Manage your security settings",
    uuid: 2
  },
  {
    label: "Notifications",
    icon: IconBellRinging,
    description: "Set up your notifications",
    uuid: 3
  },
  {
    label: "Data & Personalization",
    icon: IconDatabase,
    description: "Manage your data",
    uuid: 4
  },
  {
    label: "Help",
    icon: IconHelp,
    description: "Get help with your account",
    uuid: 5
  }
];

// Contains menu items for privacy settings
export const AppSettingsMenu: NestedMenuSettingsType[] = [
  {
    label: "General",
    icon: IconHomeCog,
    description: "Change your general settings",
    uuid: 6
  },
  {
    label: "Appearance",
    icon: IconWand,
    description: "Change your appearance settings",
    uuid: 7
  },
  {
    label: "Accessibility",
    icon: IconBlocks,
    description: "Change your accessibility settings",
    uuid: 8
  },
  {
    label: "Language",
    icon: IconLanguage,
    description: "Change your language settings",
    uuid: 9
  },
  {
    label: "About",
    icon: IconMessageChatbot,
    description: "About this application",
    uuid: 10
  }
];

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