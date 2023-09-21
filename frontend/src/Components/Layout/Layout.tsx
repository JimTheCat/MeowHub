import {ActionIcon, AppShell, Group, Header, Title, useMantineColorScheme} from "@mantine/core";
import {MoonStars, Sun} from 'tabler-icons-react';
import {Outlet, useNavigate} from "react-router-dom";

export const Layout = () => {

  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      fixed
      header={
        <Header height={70} p={ "xs" }>
          <Group position={"apart"}>
            <Title
              order={2}
              onClick={() => {navigate("/")}}
              style={{cursor: 'pointer'}}>
              Reimbursement Calculation App</Title>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
          </Group>
        </Header>
      }
    >
      <Outlet/>
    </AppShell>
  );
}