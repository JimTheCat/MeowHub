import {Box, SegmentedControl, Title} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Languages} from "../../../../shared/consts";

export const Language = () => {
  const {i18n, t} = useTranslation("settings");
  const languages = Languages();

  const handleLanguageChange = (languageCode: string | null) => {
    if (!languageCode) return;
    if (languageCode === i18n.language) return;
    i18n.changeLanguage(languageCode);
  };

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
