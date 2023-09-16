import {useTranslation} from "react-i18next";

export const Languages = () => {
  const { t } = useTranslation('footer');

  return(
    [
      {
        name: t('language.english'),
        code: "en"

      },
      {
        name: t('language.polish'),
        code: "pl"
      }
    ]
  );
}