import {ActionIcon, AppShell, Group, MantineColor, Title, useMantineColorScheme} from "@mantine/core";
import {IconMoonStars, IconSun} from '@tabler/icons-react';
import {Outlet, useNavigate} from "react-router-dom";

export const Layout = () => {

  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      header={{
        height: 70,
      }}
    >
      <AppShell.Header>
        <Group justify={"space-between"}>
          <Title
            order={2}
            onClick={() => {
              navigate("/")
            }}
            style={{cursor: 'pointer'}}>
            Reimbursement Calculation App</Title>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" as MantineColor : "blue" as MantineColor} // I don't know what happened here but works ¯\_(ツ)_/¯
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18}/> : <IconMoonStars size={18}/>}
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <Outlet/>
    </AppShell>
  );
}