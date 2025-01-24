import {Box, Button, Group, Select, Text, Title, useMantineColorScheme,} from "@mantine/core";
import {useThemeStore} from "../../../../../Providers/ThemeStore.ts";
import {Trans, useTranslation} from "react-i18next";

export const Appearance = () => {
  const {colorScheme, setColorScheme} = useMantineColorScheme();
  const primaryColor = useThemeStore((state) => state.primaryColor);
  const setPrimaryColor = useThemeStore((state) => state.setPrimaryColor);
  const {t} = useTranslation("settings");

  const toggleColorScheme = (value?: "dark" | "light") =>
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));

  const handleColorChange = (value: string | null) => {
    if (!value) return;
    setPrimaryColor(value);
  };

  return (
    <Box p={20}>
      <Title>{t('app.appearance.content.title')}</Title>

      <Text my={'md'}>
        <Trans
          i18nKey={t('app.appearance.content.activeSettings', {
            theme: t(`app.appearance.content.theme.${colorScheme}`),
            color: t(`app.appearance.content.primary.${primaryColor}`)
          })}
          components={{
            1: (
              <b/>
            ),
          }}
        />
      </Text>

      <Group justify="apart" align="flex-end" mt="md">
        <Button onClick={() => toggleColorScheme()}>
          {t('app.appearance.content.theme.label', {theme: t(`app.appearance.content.theme.${colorScheme}`)})}
        </Button>

        <Select
          label={t('app.appearance.content.primary.label')}
          value={primaryColor}
          onChange={handleColorChange}
          data={[
            {value: "gray", label: t('app.appearance.content.primary.gray')},
            {value: "red", label: t('app.appearance.content.primary.red')},
            {value: "pink", label: t('app.appearance.content.primary.pink')},
            {value: "grape", label: t('app.appearance.content.primary.grape')},
            {value: "violet", label: t('app.appearance.content.primary.violet')},
            {value: "indigo", label: t('app.appearance.content.primary.indigo')},
            {value: "blue", label: t('app.appearance.content.primary.blue')},
            {value: "cyan", label: t('app.appearance.content.primary.cyan')},
            {value: "green", label: t('app.appearance.content.primary.green')},
            {value: "lime", label: t('app.appearance.content.primary.lime')},
            {value: "yellow", label: t('app.appearance.content.primary.yellow')},
            {value: "orange", label: t('app.appearance.content.primary.orange')},
            {value: "teal", label: t('app.appearance.content.primary.teal')},
          ]}
        />
      </Group>
    </Box>
  );
};
