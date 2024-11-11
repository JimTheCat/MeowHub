import {Card, Grid, Group, Image, Text, UnstyledButton} from "@mantine/core";
import {Multimedia} from "../../../Services/Constants/DummyMultimedia.tsx";

export const ProfileMultimedia = (props: { multimedia: Multimedia[] }) => {

  const handleButtonClick = (event) => {
    event.preventDefault();

    window.open(event.target.href, '_blank', 'noopener,noreferrer');
  }

  return (
    <Card shadow="sm" px="lg" pt={"lg"} radius="md" w={400} withBorder>
      <Group justify={"space-between"} mb={15}>
        <Text size={"lg"}>Multimedia</Text>
        <UnstyledButton component="a" href="https://www.google.com" onClick={handleButtonClick} c="dimmed">Wyświetl
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