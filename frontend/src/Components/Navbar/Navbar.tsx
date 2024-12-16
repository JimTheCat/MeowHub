import {AppShell, Avatar, Card, Group, Image, ScrollArea, Stack, Text} from "@mantine/core";
import MeowHubLogo from "../../Assets/mh_logo.svg";
import {MenuButton} from "../Buttons/Menu";
import {
  IconHome,
  IconMail,
  IconPencil,
  IconSettings,
  IconUserHeart,
  IconUserPlus,
  IconUsers,
  IconUsersGroup,
  IconZoom
} from "@tabler/icons-react";
import {LogOut} from "../Buttons/LogOut/LogOut.tsx";
import {useAuthStore} from "../../Services/authStore.ts";
import {useNavigate} from "react-router-dom";

export const Navbar = () => {

  const auth = useAuthStore();
  const nickname = auth.user?.login;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${auth.user?.tag}`);
  }

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
              <Text>{nickname}!</Text>
            </Stack>
          </Group>
        </Card>
      </AppShell.Section>

      {/*Menu*/}

      <Card mt={"lg"} p={"xs"} h={"100%"} withBorder>
        <AppShell.Section grow component={ScrollArea}>
          <MenuButton icon={<IconHome/>} text={"Strona główna"} href={"/mainpage"}/>
          <MenuButton icon={<IconZoom/>} text={"Wyszukaj"} href={"/search"}/>
          <MenuButton icon={<IconPencil/>} text={"Napisz post"} href={"/createpost"}/>
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