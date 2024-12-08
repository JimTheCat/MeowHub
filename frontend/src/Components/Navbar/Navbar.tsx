import {AppShell, Avatar, Box, Card, Group, Image, Stack, Text} from "@mantine/core";
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
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Card mt={"lg"} p={"xs"} display={"flex"} h={"100%"} withBorder>
          <Stack justify={"space-between"} h={"100%"}>
            <Box>
              <MenuButton icon={<IconHome/>} text={"Strona główna"} href={"/mainpage"}/>
              <MenuButton icon={<IconZoom/>} text={"Wyszukaj"} href={"/search"}/>
              <MenuButton icon={<IconPencil/>} text={"Napisz post"} href={"/createpost"}/>
              <MenuButton icon={<IconUsers/>} text={"Znajomi"} href={"/friends"}/>
              <MenuButton icon={<IconUsersGroup/>} text={"Grupy"} href={"/groups"}/>
              <MenuButton icon={<IconUserPlus/>} text={"Obserwowani"} href={"/following"}/>
              <MenuButton icon={<IconUserHeart/>} text={"Matching"} href={"placeholder5"}/>
              <MenuButton icon={<IconMail/>} text={"Wiadomości"} href={"/messages"}/>
            </Box>
            <Box>
              <MenuButton icon={<IconSettings/>} text={"Ustawienia"} href={"/settings"}/>
              <LogOut/>
            </Box>
          </Stack>
        </Card>
      </Box>
    </>
  );
}