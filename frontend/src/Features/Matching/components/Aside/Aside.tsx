import {AppShell, Card, ScrollArea, Title} from "@mantine/core";
import {MenuButton} from "../../../shared/components/MenuButton";
import {IconFilterHeart, IconHeartHandshake, IconNotes, IconSettingsHeart, IconUserHeart} from "@tabler/icons-react";

export const Aside = () => {
  const iconStroke = 1.5;
  const base = '/matching';

  return (
    <Card radius={'md'} mt={"lg"} p={"sm"} w={'90%'} withBorder>
      <Title order={2} mb={'xs'}>
        Matching
      </Title>
      <AppShell.Section component={ScrollArea}>
        <MenuButton icon={<IconHeartHandshake stroke={iconStroke}/>} text={'Meowknij'} href={base}/>
        <MenuButton icon={<IconUserHeart stroke={iconStroke}/>} text={'Profil'} href={base + '/profile'}/>
        <MenuButton icon={<IconFilterHeart stroke={iconStroke}/>} text={'Filtry'} href={base + '/filters'}/>
        <MenuButton icon={<IconNotes stroke={iconStroke}/>} text={'Moje testy'} href={base + '/tests'}/>
        <MenuButton icon={<IconSettingsHeart stroke={iconStroke}/>} text={'Ustawienia'} href={base + '/settings'}/>
      </AppShell.Section>
    </Card>
  );
}