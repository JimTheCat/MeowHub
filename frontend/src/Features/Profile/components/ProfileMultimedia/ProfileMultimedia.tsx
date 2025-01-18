import {AspectRatio, Card, Divider, Group, Image, SimpleGrid, Stack, Text, UnstyledButton} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const ProfileMultimedia = (props: { multimedia: string[] }) => {

  const navigate = useNavigate();
  const {userTag} = useParams();
  const {t} = useTranslation('profile');

  return (
    <Card shadow="sm" px="lg" pt={"lg"} radius="md" w={400} withBorder>
      <Group justify={"space-between"}>
        <Text size={"lg"}>{t('multimedia.title')}</Text>
        {props.multimedia.length > 0 &&
            <UnstyledButton onClick={() => navigate(`/profile/${userTag}/multimedia`)} c="dimmed">
              {t('multimedia.showAll')}
            </UnstyledButton>
        }
      </Group>

      <Divider my={"sm"}/>

      {props.multimedia.length === 0 &&
          <Stack align={"center"} gap={0} justify={"center"} style={{height: 200}}>
              <Text size={"xl"} c={"dimmed"}>{t('multimedia.empty')}</Text>
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