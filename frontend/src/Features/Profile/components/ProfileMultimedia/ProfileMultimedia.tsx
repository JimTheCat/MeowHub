import {AspectRatio, Card, Divider, Group, Image, SimpleGrid, Stack, Text, UnstyledButton} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";

export const ProfileMultimedia = (props: { multimedia: string[] }) => {

  const navigate = useNavigate();
  const {userTag} = useParams();

  return (
    <Card shadow="sm" px="lg" pt={"lg"} radius="md" w={400} withBorder>
      <Group justify={"space-between"}>
        <Text size={"lg"}>Multimedia</Text>
        {props.multimedia.length > 0 &&
            <UnstyledButton onClick={() => navigate(`/profile/${userTag}/multimedia`)} c="dimmed">
                Wyświetl wszystko
            </UnstyledButton>
        }
      </Group>

      <Divider my={"sm"}/>

      {props.multimedia.length === 0 &&
          <Stack align={"center"} gap={0} justify={"center"} style={{height: 200}}>
              <Text size={"xl"} c={"dimmed"}>Brak multimediów</Text>
          </Stack>
      }
      <SimpleGrid cols={3}>
        {props.multimedia.map((media) => {
          return (
            <AspectRatio ratio={1} key={media}>
              <Image src={media}/>
            </AspectRatio>
          );
        })}
      </SimpleGrid>

    </Card>
  );
}