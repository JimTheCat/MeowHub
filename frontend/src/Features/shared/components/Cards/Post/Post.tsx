import {Avatar, Badge, Button, Card, Center, Divider, Group, Loader, Stack, Text} from "@mantine/core";
import {InnerHtmlHandler} from "../../InnerHtmlHandler";
import {DateFormatter, RenderPhotos} from "../../../utils";
import {IconMessage} from "@tabler/icons-react";
import {useAuthStore} from "../../../services/authStore.ts";
import {useNavigate} from "react-router-dom";
import {MenuPost} from "./components/MenuPost";
import {PostDTO} from "../../../types";
import {useTranslation} from "react-i18next";
import {modals} from "@mantine/modals";
import api from "../../../services/api.ts";
import {DetailedPost} from "./DetailedPost.tsx";
import {ReactionButton} from "./components/ReactionButton";
import {ShareButton} from "./components/ShareButton";

type PostProps = PostDTO & {
  cardWidth?: number | string;
  bordered?: boolean;
}

export const Post = (props: PostProps) => {

  const auth = useAuthStore();
  const {t} = useTranslation('postComponent')
  const isOwner = auth.user?.login === props.author.login;
  const navigate = useNavigate();

  const fetchModal = (modal: string, postId: string) => {
    api.get(`/api/posts/${postId}`).then(r => {
      if (r.status === 200) {
        const post = r.data;
        modals.updateModal({
          modalId: modal,
          title: t('modals.updated.title', {name: post.author.name, surname: post.author.surname}),
          children: (
            <DetailedPost id={post.id} content={post.content} createdAt={post.createdAt}
                          numberOfComments={post.numberOfComments} author={post.author} t={t} modal={modal}/>
          )
        })
      }
    });
  };

  const handleModalExposure = (postId: string) => {
    const popUp = modals.open({
      title: t('modals.initial.title'),
      size: "xl",
      closeOnEscape: true,
      closeOnClickOutside: true,
      children: (
        <Center>
          <Loader size="xl"/>
        </Center>
      )
    });

    fetchModal(popUp, postId);
  };

  const handleReaction = (label: string) => {
    console.log("Reaction button clicked: ", label);
  }

  return (
    <Card w={props.cardWidth ? props.cardWidth : "30vw"} radius={"md"} p={"lg"} withBorder={props.bordered}>
      <Stack>
        <Group justify="space-between">
          <Group onClick={() => navigate(`/profile/@${props.author.login}`)} style={{cursor: "pointer"}}>
            <Avatar src={props.author.profilePictureUrl} size={"lg"} radius={180}/>
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
        {props.pictures && props.pictures.length > 0 && (
          <Card.Section mt="sm">
            {<RenderPhotos pictures={props.pictures}/>}
          </Card.Section>
        )}

        <Divider my={"xs"}/>

        <Group grow preventGrowOverflow={false}>
          <ReactionButton onReact={handleReaction}>
            {t('buttons.reaction.label')}
          </ReactionButton>
          <Button
            variant={"subtle"}
            color={"gray"}
            leftSection={<IconMessage stroke={1.5}/>}
            rightSection={<Badge color={"gray"} circle>{props.numberOfComments}</Badge>}
            onClick={() => handleModalExposure(props.id)}
          >
            {t('buttons.comment.label')}
          </Button>
          <ShareButton postId={props.id}>
            {t('buttons.share.label')}
          </ShareButton>
        </Group>
      </Stack>
    </Card>
  );
}