import {Avatar, Badge, Button, Divider, Group, Stack, Text, Textarea} from "@mantine/core";
import {PostDTO} from "../../../types";
import {TFunction} from "i18next";
import {useEffect, useState} from "react";
import {CommentDTO} from "./types";
import api from "../../../services/api.ts";
import {CommentsSection} from "./components/CommentsSection";
import {useAlert} from "../../../../../Providers/AlertProvider.tsx";
import {IconMessage} from "@tabler/icons-react";
import {DateFormatter, RenderPhotos} from "../../../utils";
import {InnerHtmlHandler} from "../../InnerHtmlHandler";
import {MenuPost} from "./components/MenuPost";
import {useAuthStore} from "../../../services/authStore.ts";
import {ReactionButton} from "./components/ReactionButton";
import {ShareButton} from "./components/ShareButton";

type PostProps = PostDTO & {
  t: TFunction<string, undefined>
  modal: string
  onCommentAdded?: () => void
}

export const DetailedPost = (props: PostProps) => {
  const auth = useAuthStore();
  const isOwner = auth.user?.login === props.author.login;
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [commentValue, setCommentValue] = useState("");
  const alert = useAlert();

  const handleCommentEdit = (id: string, content: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? {...comment, content} : comment
    );
    setComments(updatedComments);
  };

  const handleCommentDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleSentComment = async () => {
    if (commentValue.length > 0) {
      try {
        const response = await api.post(`/api/comments`, null, {
          params: {
            postId: props.id,
            content: commentValue,
          },
        });
        if (response.status === 200) {
          alert.showError({
            title: props.t("detailedPost.alert.title"),
            message: props.t("detailedPost.alert.message"),
            level: "INFO",
            timestamp: new Date().toISOString(),
          });

          setComments([...comments, response.data]);
          setCommentValue("");

          if (props.onCommentAdded) {
            props.onCommentAdded();
          }
        }
      } catch (error) {
        console.error("Failed to send comment", error);
      }
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/api/comments/post/${props.id}`);
        if (response.status === 200) {
          setComments(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments().then(r => r);
  }, []);

  return (
    <Stack gap={'xs'}>
      <Group justify="space-between">
        <Group style={{cursor: "pointer"}}>
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
        <RenderPhotos pictures={props.pictures}/>
      )}

      <Divider my={"xs"}/>

      <Group grow preventGrowOverflow={false}>
        <ReactionButton onReact={console.log}>
          {props.t('buttons.reaction.label')}
        </ReactionButton>
        <Button
          variant={"subtle"}
          color={"gray"}
          leftSection={<IconMessage stroke={1.5}/>}
          rightSection={<Badge color={"gray"} circle>{comments.length}</Badge>}
        >
          {props.t('buttons.comment.label')}
        </Button>
        <ShareButton postId={props.id}>
          {props.t('buttons.share.label')}
        </ShareButton>
      </Group>

      <Divider my={"xs"}/>

      <Textarea
        radius="md"
        label={props.t('detailedPost.textArea.label')}
        placeholder={props.t('detailedPost.textArea.placeholder')}
        value={commentValue}
        onChange={(e) => setCommentValue(e.currentTarget.value)}
      />
      <Group justify={"flex-end"}>
        <Button variant="outline" color="blue" onClick={handleSentComment}>
          {props.t('detailedPost.textArea.children')}
        </Button>
      </Group>
      <CommentsSection
        comments={comments}
        onCommentDelete={handleCommentDelete}
        onCommentEdit={handleCommentEdit}
        modal={props.modal}
      />
    </Stack>
  );
};