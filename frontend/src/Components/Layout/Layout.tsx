import {AppShell, Skeleton, useMantineColorScheme} from "@mantine/core";
import {Outlet, useNavigate} from "react-router-dom";

export const Layout = () => {

  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      navbar={{width: 300, breakpoint: 'xs'}}
    >
      {/*TODO: Modify a navbar*/}
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false}/>
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}