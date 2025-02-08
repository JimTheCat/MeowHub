import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import {useWebsocketStore} from "./websocketStore.ts";

type AuthState = {
  user: { login: string; tag: string; permissions: string[] } | null;
  token: string | null;
  login: (user: userData) => Promise<void>;
  logout: () => void;
  isLogged: () => boolean;
};

type userData = {
  jwtToken: string;
  login: string;
  roles: string[];
};

export const useAuthStore = create<AuthState>((set) => {
  // Retrieve state during initialization
  const storedToken = localStorage.getItem("token");
  let decodedUser = null;

  if (storedToken) {
    try {
      const decoded: any = jwtDecode(storedToken);
      decodedUser = {
        login: decoded.sub,
        tag: '@' + decoded.sub,
        permissions: decoded.roles || [],
      };

      const {connect} = useWebsocketStore.getState();
      connect(storedToken);

    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // Remove invalid token
    }
  }

  return {
    user: decodedUser,
    token: storedToken,
    login: async (user: userData) => {
      const decoded: any = jwtDecode(user.jwtToken);
      set({
        user: {login: decoded.sub, tag: '@' + decoded.sub, permissions: user.roles},
        token: user.jwtToken,
      });
      localStorage.setItem("token", user.jwtToken);

      const {connect} = useWebsocketStore.getState();
      connect(user.jwtToken);

      const {client} = useWebsocketStore.getState();
      if (client?.connected) {
        client.publish({
          destination: '/app/user.addUser',
          body: decoded.sub
        });
      }
    },
    logout: () => {
      const {client} = useWebsocketStore.getState();
      const user = useAuthStore.getState().user;

      if (client?.connected && user?.login) {
        client.publish({
          destination: '/app/user.disconnectUser',
          body: user.login,
        });
      }

      set({user: null, token: null});
      localStorage.removeItem("token");
      localStorage.removeItem("X-XSRF-TOKEN");

      if (client) {
        client.deactivate().then(() => {
          useWebsocketStore.setState({client: null});
        });
      }
    },
    isLogged: () => {
      return !!localStorage.getItem("token");
    },
  };
});