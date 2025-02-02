import {ReactNode} from "react";
import {createTheme, MantineProvider} from "@mantine/core";
import {useThemeStore} from "./ThemeStore.ts";

export const CustomMantineProvider = ({children}: { children: ReactNode }) => {
  const primaryColor = useThemeStore((state) => state.primaryColor);

  const theme = createTheme({
    fontFamily: 'Lato, sans-serif',
    primaryColor,
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
      {children}
    </MantineProvider>
  );
}