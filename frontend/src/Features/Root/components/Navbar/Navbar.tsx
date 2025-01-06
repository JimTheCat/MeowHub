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

export const Navbar = () => {

  const auth = useAuthStore();
  const navigate = useNavigate();
  const [basicUserInfo, setBasicUserInfo] = useState<BasicUserInfo | null>(null);

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
            alt="MeowHub Logo"
            w={"auto"}
            fit="contain"
          />
        </Card>
      </AppShell.Section>

      {/*Profile*/}
      <AppShell.Section>
        <Card p={"xs"} withBorder style={{cursor: "pointer"}} onClick={handleProfileClick}>
          <Group>
            <Avatar radius={180} size={"xl"}/>
            <Stack justify={"center"} gap={0}>
              <Text>Witaj</Text>
              <Text>{basicUserInfo?.name} {basicUserInfo?.surname}</Text>
            </Stack>
          </Group>
        </Card>
      </AppShell.Section>

      {/*Menu*/}

      <Card mt={"lg"} p={"xs"} h={"100%"} withBorder>
        <AppShell.Section grow component={ScrollArea}>
          <MenuButton mainMenu icon={<IconHome/>} text={"Strona główna"} href={"/mainpage"}/>
          <MenuButton mainMenu icon={<IconZoom/>} text={"Wyszukaj"} href={"/search"}/>
          <CreatePost/>
          <MenuButton mainMenu icon={<IconUsers/>} text={"Znajomi"} href={"/friends"}/>
          <MenuButton mainMenu icon={<IconUsersGroup/>} text={"Grupy"} href={"/groups"}/>
          <MenuButton mainMenu icon={<IconTopologyFull/>} text={"Relacje"} href={"/relations"}/>
          <MenuButton mainMenu icon={<IconUserHeart/>} text={"Matching"} href={"/matching"}/>
          <MenuButton mainMenu icon={<IconMail/>} text={"Wiadomości"} href={"/messages"}/>
        </AppShell.Section>
        <AppShell.Section>
          <MenuButton mainMenu icon={<IconSettings/>} text={"Ustawienia"} href={"/settings"}/>
          <LogOut/>
        </AppShell.Section>
      </Card>
    </>
  );
}