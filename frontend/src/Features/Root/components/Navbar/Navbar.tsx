import {AppShell, Avatar, Card, Group, Image, ScrollArea, Stack, Text} from "@mantine/core";
import MeowHubLogo from "../../../../Assets/mh_logo.svg";
import {MenuButton} from "../Buttons/Menu";
import {
  IconHome,
  IconMail,
  IconSettings,
  IconUserHeart,
  IconUserPlus,
  IconUsers,
  IconUsersGroup,
  IconZoom
} from "@tabler/icons-react";
import {LogOut} from "../Buttons/LogOut";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {useNavigate} from "react-router-dom";
import {CreatePost} from "../../../CreatePost";
import {BasicUserInfo} from "../../../shared/types/User.tsx";
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
      api.get<BasicUserInfo>('/api/users/get-basic-user-info', {params: {login: auth.user.login}}).then((response) => {
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
          <MenuButton icon={<IconHome/>} text={"Strona główna"} href={"/mainpage"}/>
          <MenuButton icon={<IconZoom/>} text={"Wyszukaj"} href={"/search"}/>
          <CreatePost/>
          <MenuButton icon={<IconUsers/>} text={"Znajomi"} href={"/friends"}/>
          <MenuButton icon={<IconUsersGroup/>} text={"Grupy"} href={"/groups"}/>
          <MenuButton icon={<IconUserPlus/>} text={"Obserwowani"} href={"/following"}/>
          <MenuButton icon={<IconUserHeart/>} text={"Matching"} href={"placeholder5"}/>
          <MenuButton icon={<IconMail/>} text={"Wiadomości"} href={"/messages"}/>
        </AppShell.Section>
        <AppShell.Section>
          <MenuButton icon={<IconSettings/>} text={"Ustawienia"} href={"/settings"}/>
          <LogOut/>
        </AppShell.Section>
      </Card>
    </>
  );
}