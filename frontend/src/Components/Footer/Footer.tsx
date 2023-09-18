import {Group, Text} from "@mantine/core";
import {Languages} from "../../Services/Constants";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export const Footer = () => {

  const { t, i18n } = useTranslation('footer');

  return(
    <Group position={"apart"} p={"md"} sx={(theme) => ({
      backgroundColor: (theme.colorScheme === "dark" ? "#191919" : "#efefef")
    })}>
      <Group>
        {Languages().map((language, key) => {
          return (
            <Text key={key} sx={{cursor: 'pointer'}} onClick={() => {
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