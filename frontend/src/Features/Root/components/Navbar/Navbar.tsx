import {AppShell, Avatar, Card, Group, Image, ScrollArea, Stack, Text} from "@mantine/core";
import MeowHubLogo from "../../../../Assets/mh_logo.svg";
import {MenuButton} from "../../../shared/components/MenuButton";
import {
  IconHome,
  IconMail,
  IconSettings,
  IconTopologyFull,
  IconUserHeart,
  IconUsers,
  IconUsersGroup,
  IconZoom
} from "@tabler/icons-react";
import {LogOut} from "../Buttons/LogOut";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {useNavigate} from "react-router-dom";
import {CreatePost} from "../../../CreatePost";
import {BasicUserInfo} from "../../../shared/types";
import {useEffect, useState} from "react";
import api from "../../../shared/services/api.ts";
import {useTranslation} from "react-i18next";

export const Navbar = () => {

  const auth = useAuthStore();
  const navigate = useNavigate();
  const [basicUserInfo, setBasicUserInfo] = useState<BasicUserInfo | null>(null);
  const {t} = useTranslation('root');

  const handleProfileClick = () => {
    navigate(`/profile/${auth.user?.tag}`);
  }

  useEffect(() => {
    if (auth.user) {
      api.get<BasicUserInfo>('/api/users/basic-user-info', {params: {login: auth.user.login}}).then((response) => {
        setBasicUserInfo(response.data);
      });
    }
  }, [auth.user]);

  return (
    <>
      {/*Logo*/}
      <AppShell.Section>
        <Card p={"xs"} mb={"lg"} withBorder radius={"md"} style={{cursor: "pointer"}}
              onClick={() => navigate("/mainpage")}>
          <Image
            src={MeowHubLogo}
            alt={t('navbar.logo.alt')}
            w={"auto"}
            fit="contain"
          />
        </Card>
      </AppShell.Section>

      {/*Profile*/}
      <AppShell.Section>
        <Card p={"xs"} withBorder style={{cursor: "pointer"}} onClick={handleProfileClick}>
          <Group>
            <Avatar src={basicUserInfo?.profilePictureUrl} radius={180} size={"xl"}/>
            <Stack justify={"center"} gap={0}>
              <Text>{t('navbar.profile.greeting')}</Text>
              <Text>{basicUserInfo?.name} {basicUserInfo?.surname}</Text>
            </Stack>
          </Group>
        </Card>
      </AppShell.Section>

      {/*Menu*/}
      <Card mt={"lg"} p={"xs"} h={"100%"} withBorder>
        <AppShell.Section grow component={ScrollArea}>
          <MenuButton mainMenu icon={<IconHome/>} text={t('navbar.menu.home')} href={"/mainpage"}/>
          <MenuButton mainMenu icon={<IconZoom/>} text={t('navbar.menu.search')} href={"/search"}/>
          <CreatePost/>
          <MenuButton mainMenu icon={<IconUsers/>} text={t('navbar.menu.friends')} href={"/friends"}/>
          <MenuButton disabled mainMenu icon={<IconUsersGroup/>} text={t('navbar.menu.groups')} href={"/groups"}/>
          <MenuButton mainMenu icon={<IconTopologyFull/>} text={t('navbar.menu.relations')} href={"/relations"}/>
          <MenuButton mainMenu icon={<IconUserHeart/>} text={t('navbar.menu.matching')} href={"/matching"}/>
          <MenuButton disabled mainMenu icon={<IconMail/>} text={t('navbar.menu.messages')} href={"/messages"}/>
        </AppShell.Section>
        <AppShell.Section>
          <MenuButton mainMenu icon={<IconSettings/>} text={t('navbar.menu.settings')} href={"/settings"}/>
          <LogOut/>
        </AppShell.Section>
      </Card>
    </>
  );
}