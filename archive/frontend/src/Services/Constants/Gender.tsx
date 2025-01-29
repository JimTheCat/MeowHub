import {useTranslation} from "react-i18next";

export const Gender: () => string[] = () => {

  const {t} = useTranslation('gender');
  return (
    [
      t("male"),
      t("female"),
      t("other")
    ] as string[]);
}
