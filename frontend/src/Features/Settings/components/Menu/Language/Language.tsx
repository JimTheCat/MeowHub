import {Box, SegmentedControl, Title} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Languages} from "../../../../shared/consts";
import {useEffect} from "react";

export const Language = () => {
  const {i18n, t} = useTranslation("settings");
  const languages = Languages();

  const handleLanguageChange = (languageCode: string | null) => {
    if (!languageCode || languageCode === i18n.language) return;

    i18n.changeLanguage(languageCode);
    localStorage.setItem("language", languageCode);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <Box p={20}>
      <Title>{t('app.language.content.title')}</Title>

      <SegmentedControl
        mt="md"
        value={i18n.language}
        onChange={handleLanguageChange}
        size={'lg'}
        data={languages.map((lang) => ({
          value: lang.code,
          label: lang.name,
        }))}
      />
    </Box>
  );
};
