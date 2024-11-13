import {AppShell, Skeleton} from "@mantine/core";
import {Outlet} from "react-router-dom";

export const Layout = () => {
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