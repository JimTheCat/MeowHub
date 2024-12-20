import {useTranslation} from "react-i18next";

export type GenderType = {
  label: string;
  value: string;
}

export const Gender: () => GenderType[] = () => {

  const {t} = useTranslation('gender');
  return (
    [
      {
        label: t("male"),
        value: "MALE"
      },
      {
        label: t("female"),
        value: "FEMALE"
      },
      {
        label: t("other"),
        value: "OTHER"
      }
    ]
  );
}
