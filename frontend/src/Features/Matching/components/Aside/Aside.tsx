import {AppShell, Card, ScrollArea, Title} from "@mantine/core";
import {MenuButton} from "../../../shared/components/MenuButton";
import {IconFilterHeart, IconHeartHandshake, IconNotes, IconSettingsHeart, IconUserHeart} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";

export const Aside = () => {
  const iconStroke = 1.5;
  const base = '/matching';
  const {t} = useTranslation('matching');

  return (
    <Card radius={'md'} mt={"lg"} p={"sm"} w={'90%'} withBorder>
      <Title order={2} mb={'xs'}>
        {t('aside.title')}
      </Title>
      <AppShell.Section component={ScrollArea}>
        <MenuButton icon={<IconHeartHandshake stroke={iconStroke}/>} text={t('aside.menu.base')} href={base}/>
        <MenuButton icon={<IconUserHeart stroke={iconStroke}/>} text={t('aside.menu.profile')}
                    href={base + '/profile'}/>
        <MenuButton icon={<IconFilterHeart stroke={iconStroke}/>} text={t('aside.menu.filters')}
                    href={base + '/filters'}/>
        <MenuButton disabled icon={<IconNotes stroke={iconStroke}/>} text={t('aside.menu.tests')}
                    href={base + '/tests'}/>
        <MenuButton icon={<IconSettingsHeart stroke={iconStroke}/>} text={t('aside.menu.settings')}
                    href={base + '/settings'}/>
      </AppShell.Section>
    </Card>
  );
}