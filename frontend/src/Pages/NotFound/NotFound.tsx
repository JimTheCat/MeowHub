import {Button, Center, Group, Image, Stack, Text} from "@mantine/core";
import photo from "../../Assets/NotFound/cat-error.gif";
import {ContainerVhVw} from "../../Components/ContainerVhVw";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const NotFound = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('notfound');

  return (
    <ContainerVhVw vh={100} vw={99}>
      <Center h={"inherit"}>
        <Stack align={"center"}>
          <Text size={'32'} fw={700}>{t('label')}</Text>
          <Group align={"center"} gap={100}>
            <Image maw={240} mx="auto" radius="md" src={photo} alt="Cat error 404"/>
            <Button color={'pink'} size={"xl"} variant="light" onClick={() => navigate("/")}>{t('button')}</Button>
          </Group>
        </Stack>
      </Center>
    </ContainerVhVw>
  );
}