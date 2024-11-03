import {ReactNode} from "react";
import {MantineColorScheme, useMantineColorScheme} from "@mantine/core";
import {useHotkeys} from '@mantine/hooks';

export const ThemeProvider = ({children}: { children: ReactNode }) => {

  const {colorScheme, setColorScheme} = useMantineColorScheme();
  const toggleColorScheme = (value?: MantineColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <>
        {children}
    </>
  );
}