import {create} from "zustand";
import {jwtDecode} from "jwt-decode";

type AuthState = {
  user: { login: string; tag: string; permissions: string[] } | null;
  token: string | null;
  login: (user: userData) => void;
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
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // Remove invalid token
    }
  }

  return {
    user: decodedUser,
    token: storedToken,
    login: (user: userData) => {
      const decoded: any = jwtDecode(user.jwtToken);
      set({
        user: {login: decoded.sub, tag: '@' + decoded.sub, permissions: user.roles},
        token: user.jwtToken,
      });
      localStorage.setItem("token", user.jwtToken);
    },
    logout: () => {
      set({user: null, token: null});
      localStorage.removeItem("token");
      localStorage.removeItem("X-XSRF-TOKEN");
    },
    isLogged: () => {
      return !!localStorage.getItem("token");
    },
  };
});
