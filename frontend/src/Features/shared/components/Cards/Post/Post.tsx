import {
  Avatar,
  BackgroundImage,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text
} from "@mantine/core";
import {InnerHtmlHandler} from "../../InnerHtmlHandler";
import {DateFormatter} from "../../../utils/DateFormatter.tsx";
import {IconMessage, IconPaw, IconShare3} from "@tabler/icons-react";
import {useAuthStore} from "../../../services/authStore.ts";
import {useNavigate} from "react-router-dom";
import {ImageWithSkeleton} from "../../ImageWithSkeleton";
import {MenuPost} from "./components/MenuPost";
import {PostDTO} from "../../../../MainPage/types/Post.tsx";

export const Post = (props: PostDTO) => {

  const auth = useAuthStore();
  const isOwner = auth.user?.login === props.author.login;
  const navigate = useNavigate();

  /*Render this element each time when number of photos will change*/
  const renderPhotos = (urls: string[]) => {
    const uniqueKey = `photo-grid-${urls.join("-")}`;
    const maxHeight = '30vh';

    if (urls.length === 1) {
      return <ImageWithSkeleton src={urls[0]} alt="" radius="md" key={uniqueKey} style={{maxHeight: maxHeight}}/>;
    }

    if (urls.length === 2 || urls.length === 4) {
      return (
        <SimpleGrid cols={2} spacing="xs" key={uniqueKey}>
          {urls.map((url) => (
            <ImageWithSkeleton src={url} alt="" radius="md" key={url} style={{maxHeight: maxHeight}}/>
          ))}
        </SimpleGrid>
      );
    }

    if (urls.length === 3) {
      const spacing = 8;
      return (
        <Group wrap="nowrap" align="stretch" style={{width: '100%', height: '300px'}}>
          <ImageWithSkeleton
            src={urls[0]}
            alt=""
            radius="md"
            style={{
              flex: 1,
              height: `calc(100% + ${spacing / 2}px)`,
              objectFit: 'cover',
            }}
          />

          <Stack gap={spacing + 4} style={{flex: 1, height: '100%'}}>
            <ImageWithSkeleton
              src={urls[1]}
              alt=""
              radius="md"
              style={{height: `calc(50% - ${spacing / 2}px)`, objectFit: 'cover'}}
            />
            <ImageWithSkeleton
              src={urls[2]}
              alt=""
              radius="md"
              style={{height: `calc(50% - ${spacing / 2}px)`, objectFit: 'cover'}}
            />
          </Stack>
        </Group>
      );
    }


    return (
      <SimpleGrid cols={2} spacing="xs" key={uniqueKey}>
        {urls.slice(0, 3).map((url, idx) => (
          <ImageWithSkeleton src={url} alt="" radius="md" key={`${url}-${idx}`} style={{maxHeight: maxHeight}}/>
        ))}
        <BackgroundImage
          src={urls[3]}
          radius="md"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: maxHeight
          }}
        >
          <Text
            size="xl"
            w={700}
            c="white"
            ta="center"
            style={{
              zIndex: 1,
              textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            +{urls.length - 4}
          </Text>
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: "inherit",
            }}
          />
        </BackgroundImage>
      </SimpleGrid>
    );
  };

  return (
    <Card w={"30vw"} radius={"md"} p={"lg"} my={'lg'}>
      <Stack>
        <Group justify="space-between">
          <Group onClick={() => navigate(`/profile/@${props.author.login}`)} style={{cursor: "pointer"}}>
            <Avatar src={null} size={"lg"} radius={180}/>
            <Stack gap={0}>
              <Text>{props.author.name} {props.author.surname}</Text>
              <Text c="dimmed">{DateFormatter(props.createdAt)}</Text>
            </Stack>
          </Group>
          {isOwner &&
              <MenuPost postId={props.id} content={props.content}/>
          }
        </Group>

        <InnerHtmlHandler innerHtml={props.content}/>

        {/*// Show photos if they exist*/}
        {props.photosUrls && props.photosUrls.length > 0 && (
          <Card.Section mt="sm">
            {renderPhotos(props.photosUrls)}
          </Card.Section>
        )}

        <Divider my={"xs"}/>

        <Group grow preventGrowOverflow={false}>
          <Button variant={"subtle"} color={"gray"} leftSection={<IconPaw stroke={1.5}/>}>
            Reaction
          </Button>
          <Button
            variant={"subtle"}
            color={"gray"}
            leftSection={<IconMessage stroke={1.5}/>}
            rightSection={<Badge color={"gray"} circle>{props.numberOfComments}</Badge>}
          >
            Comment
          </Button>
          <Button variant={"subtle"} color={"gray"} leftSection={<IconShare3 stroke={1.5}/>}>
            Share
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}