import {Center, Title} from "@mantine/core";
import {useTranslation} from "react-i18next";

export const UnselectedChat = () => {
  const {t} = useTranslation('messenger');

  return (
    <Center h={"100vh"}>
      <Title>
        {t('unselectedChat')}
      </Title>
    </Center>
  );
}