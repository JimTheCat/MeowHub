import {create} from "zustand";
import {persist} from "zustand/middleware";

type ThemeStore = {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      primaryColor: "blue",
      setPrimaryColor: (color) => set({primaryColor: color}),
    }),
    {
      name: "theme-storage",
    }
  )
);
