import {AppShell, Avatar, Box, Card, Group, Image, Stack, Text} from "@mantine/core";
import MeowHubLogo from "../../../public/mh_logo.svg";
import {MenuButton} from "../Buttons/Menu";
import {
  IconHome,
  IconLogout,
  IconMail,
  IconPencil,
  IconSettings,
  IconUserHeart,
  IconUserPlus,
  IconUsers,
  IconUsersGroup,
  IconZoom
} from "@tabler/icons-react";

export const Navbar = () => {

  const nickname = "Placeholder name";

  return (
    <>

      {/*Logo*/}
      <AppShell.Section>
        <Card p={"xs"} mb={"lg"} withBorder radius={"md"}>
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
        <Card p={"xs"} withBorder>
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
              <MenuButton icon={<IconUsers/>} text={"Znajomi"} href={"placeholder2"}/>
              <MenuButton icon={<IconUsersGroup/>} text={"Grupy"} href={"placeholder3"}/>
              <MenuButton icon={<IconUserPlus/>} text={"Obserwowani"} href={"placeholder4"}/>
              <MenuButton icon={<IconUserHeart/>} text={"Matching"} href={"placeholder5"}/>
              <MenuButton icon={<IconMail/>} text={"Wiadomości"} href={"/messages"}/>
            </Box>
            <Box>
              <MenuButton icon={<IconSettings/>} text={"Ustawienia"}/>
              <MenuButton icon={<IconLogout/>} text={"Wyloguj się"}/>
            </Box>
          </Stack>
        </Card>
      </Box>
    </>
  );
}