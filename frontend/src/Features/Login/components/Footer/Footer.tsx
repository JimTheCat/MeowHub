import {Group, Text, useMantineColorScheme} from "@mantine/core";
import {Languages} from "../../../shared/consts/Languages.tsx";
import {useTranslation} from "react-i18next";

export const Footer = () => {

  const {colorScheme} = useMantineColorScheme();
  const { t, i18n } = useTranslation('footer');

  return(
      <Group justify={"space-between"} p={"md"} style={{
        backgroundColor: (colorScheme === "dark" ? "#191919" : "#efefef")
      }}>
      <Group>
        {Languages().map((language, key) => {
          return (
              <Text key={key} style={{cursor: 'pointer'}} onClick={() => {
              i18n.changeLanguage(language.code);
              localStorage.setItem('language', language.code)
            }}>{language.name}</Text>
          )
        })}
      </Group>
      <Text>
        {t('creators')}
      </Text>
    </Group>
  );
}