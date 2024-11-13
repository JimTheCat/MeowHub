import {Card, Grid, Group, Image, Text, UnstyledButton} from "@mantine/core";
import {Multimedia} from "../../../Services/Constants/DummyMultimedia.tsx";
import {useNavigate} from "react-router-dom";

export const ProfileMultimedia = (props: { multimedia: Multimedia[] }) => {

  const navigate = useNavigate();

  return (
    <Card shadow="sm" px="lg" pt={"lg"} radius="md" w={400} withBorder>
      <Group justify={"space-between"} mb={15}>
        <Text size={"lg"}>Multimedia</Text>
        <UnstyledButton onClick={() => navigate("https://www.google.com")} c="dimmed">Wyświetl
          wszystko</UnstyledButton>
      </Group>

      <Grid gutter={"xs"} align={"center"}>
        {props.multimedia.map((media, index) => {
          return (
            <Grid.Col span={4}>
              <Image key={index} src={media.url} alt={media.type} w={"auto"} h={100} fit={"contain"}/>
            </Grid.Col>
          );
        })}
      </Grid>

    </Card>
  );
}