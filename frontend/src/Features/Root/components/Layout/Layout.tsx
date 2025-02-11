import {AppShell} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {Navbar} from "../Navbar";
import {useEffect} from "react";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {useWebsocketStore} from "../../../shared/services/websocketStore.ts";

export const Layout = () => {
  const loggedUserLogin = useAuthStore((state) => state.user?.login);
  const {client} = useWebsocketStore();

  useEffect(() => {
    if (client && client.connected && loggedUserLogin) {
      // Subscribe to presence updates
      const presenceSub = client.subscribe('/topic/public', (message) => {
        const data = JSON.parse(message.body);
        console.log('Presence update:', data);
      });

      return () => {
        presenceSub.unsubscribe();
      };
    }
  }, [client, client?.connected, loggedUserLogin]);

  return (
    <AppShell
      navbar={{width: 300, breakpoint: 'xs'}}
    >
      <AppShell.Navbar withBorder={false}>
        <Navbar/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}