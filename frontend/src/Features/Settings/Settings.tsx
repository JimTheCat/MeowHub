import {AppShell, NavLink, ScrollArea, Text} from "@mantine/core";
import {useHotkeys} from "@mantine/hooks";
import {IconAdjustments, IconUserCog} from "@tabler/icons-react";
import {Escape} from "./components/Escape";
import {useState} from "react";
import {AppSettingsMenu, MenuContent, UserSettingsMenu} from "./consts/NestedMenuSettings.tsx";
import {useTranslation} from "react-i18next";

export const Settings = () => {

  const [activePage, setActivePage] = useState(0);
  const {t} = useTranslation('settings');
  useHotkeys([['escape', () => window.history.back()]]);

  const userSettingsItems = UserSettingsMenu().map((item) => (
    <NavLink
      key={item.uuid}
      active={item.uuid === activePage}
      label={item.label}
      description={item.description}
      leftSection={<item.icon size="1rem" stroke={1.5}/>}
      onClick={() => setActivePage(item.uuid)}
    />
  ));

  const AppSettingsItems = AppSettingsMenu().map((item) => (
    <NavLink

      key={item.uuid}
      active={item.uuid === activePage}
      label={item.label}
      description={item.description}
      leftSection={<item.icon size="1rem" stroke={1.5}/>}
      onClick={() => setActivePage(item.uuid)}
    />
  ));


  return (
    <AppShell
      navbar={{width: 300, breakpoint: 'sm'}}
      aside={{width: 100, breakpoint: 'sm'}}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea}>

          <NavLink
            label={t('settings.user.label')}
            leftSection={<IconUserCog size="1rem" stroke={1.5}/>}
            childrenOffset={28}
            defaultOpened
          >
            {userSettingsItems}
          </NavLink>

          <NavLink
            label={t('settings.app.label')}
            leftSection={<IconAdjustments size="1rem" stroke={1.5}/>}
            childrenOffset={28}
            defaultOpened
          >
            {AppSettingsItems}
          </NavLink>

        </AppShell.Section>
        <AppShell.Section>
          <Text>{t('settings.footer.greetings.label')}</Text>
          <Text size={"xs"}>{t('settings.footer.version.label', {version: '0.1.0'})}</Text>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {/*Display component dependent on active state*/}
        {MenuContent.find((item) => item.uuid === activePage)?.component}
      </AppShell.Main>
      <AppShell.Aside withBorder={false}>
        <Escape/>
      </AppShell.Aside>
    </AppShell>
  );
}