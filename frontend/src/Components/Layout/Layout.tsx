import {AppShell} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {Navbar} from "../Navbar";

export const Layout = () => {
  return (
    <AppShell
      navbar={{width: 300, breakpoint: 'xs'}}
    >
      {/*TODO: Modify a navbar*/}
      <AppShell.Navbar withBorder={false}>
        <Navbar/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}