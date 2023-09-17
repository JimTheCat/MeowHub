import {Button, Center, Group, Image, Stack, Text} from "@mantine/core";
import photo from "../../Assets/NotFound/cat-error.gif";
import {ContainerVhVw} from "../../Components/ContainerVhVw";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ContainerVhVw vh={100} vw={99}>
      <Center h={"inherit"}>
        <Stack align={"center"}>
          <Text size={32} weight={700}>Sorry but page that you are looking for does not exist :(</Text>
          <Group align={"center"} spacing={100} >
            <Image maw={240} mx="auto" radius="md" src={photo} alt="Cat error 404"/>
            <Button color={'pink'} size={"xl"} variant="light" onClick={() => navigate("/")}>Go to main page</Button>
          </Group>
        </Stack>
      </Center>
    </ContainerVhVw>
  );
}