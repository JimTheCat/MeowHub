import {Avatar, Box, Button, Card, Group, Modal, Stack, Text, Textarea} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import api from "../../../../../services/api.ts";
import {useAlert} from "../../../../../../../Providers/AlertProvider.tsx";
import {DateFormatter} from "../../../../../utils";
import {CommentDTO} from "../../types";
import {TruncatedText} from "../../../../TruncatedText";
import {useAuthStore} from "../../../../../services/authStore.ts";
import {useNavigate} from "react-router-dom";
import {modals} from "@mantine/modals";
import {useTranslation} from "react-i18next";

type CommentProps = {
  comment: CommentDTO;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  isReply?: boolean;
  depth?: number;
  modal?: string;
};

export const Comment = ({
                          comment,
                          onEdit,
                          onDelete,
                          isReply = false,
                          depth = 0,
                          modal,
                        }: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [replies, setReplies] = useState<CommentDTO[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const alert = useAlert();
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const auth = useAuthStore();
  const navigate = useNavigate();
  const {t} = useTranslation('postComponent');

  useEffect(() => {
    if (comment.countOfReplies > 0) {
      loadReplies().then(r => r);
    }
  }, []);

  const loadReplies = async () => {
    setIsLoadingReplies(true);
    await api
      .get(`/api/comments/${comment.id}`, {params: {page: 0, size: 5}})
      .then((response) => {
        if (response.status === 200) {
          setReplies(response.data.content);
        }
      })
      .finally(() => {
        setIsLoadingReplies(false);
      });
  };

  const handleReply = async () => {
    const commentId = comment.id;
    if (replyValue.trim().length > 0) {
      const response = await api.post(`/api/comments/${commentId}`, null, {
        params: {
          content: replyValue,
        },
      });

      if (response.status === 200) {
        alert.showError({
          title: t("comment.alerts.reply.title"),
          message: t("comment.alerts.reply.message"),
          level: "INFO",
          timestamp: new Date().toISOString(),
        });

        setReplyValue("");
        setIsReplying(false);

        await loadReplies();
      }
    }
  };

  const handleEdit = async () => {
    await api.post(`/api/comments/update/${comment.id}`, null, {
      params: {
        content: editValue,
      },
    }).then(() => {
      alert.showError({
        title: t("comment.alerts.edit.title"),
        message: t("comment.alerts.edit.message"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });
    });

    onEdit(comment.id, editValue);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await api.delete(`/api/comments/${comment.id}`).then(() => {
      alert.showError({
        title: t("comment.alerts.delete.title"),
        message: t("comment.alerts.delete.message"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });
    });
    onDelete(comment.id);
    setIsDeleteModalOpen(false);
  };

  const handleProfileRedirect = () => {
    navigate(`/profile/@${comment.author.login}`);
    if (modal) {
      modals.close(modal);
    }
  };

  if (comment.isDeleted) {
    return (
      <>
        <Card w={"fit-content"} withBorder shadow="sm" radius={"lg"}>
          <Text c="dimmed">{t('comment.card.deleted')}</Text>
        </Card>
        {isLoadingReplies && <Text c="dimmed">{t('comment.card.loadingReplies')}</Text>}
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            onEdit={onEdit}
            onDelete={onDelete}
            isReply={true}
            depth={depth + 2}
            modal={modal}
          />
        ))}
      </>
    );
  }
  return (
    <Box
      style={{
        marginLeft: depth * 20,
        marginTop: isReply ? 12 : 16,
      }}
      pos={"relative"}
    >
      <Card withBorder shadow="sm" radius={"lg"}>
        <Stack gap="sm">
          <Group justify="space-between">
            <Group gap={'xs'}>
              <Avatar
                size={32}
                radius="xl"
                src={comment.author.profilePictureUrl}
                alt="User avatar"
                onClick={handleProfileRedirect}
                style={{cursor: "pointer"}}
              />
              <Text fw="bold" size="sm">
                {comment.author.name} {comment.author.surname}
              </Text>
              {comment.modifiedAt && (
                <Text c="dimmed" size="xs">
                  {t('comment.card.edited')}
                </Text>
              )}
            </Group>
            <Text c="dimmed" size="xs">
              {DateFormatter(comment.createdAt)}
            </Text>
          </Group>
          {isEditing ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.currentTarget.value)}
              autosize
              minRows={2}
            />
          ) : (
            <TruncatedText text={comment.content} lines={2}/>
          )}
          <Group justify="flex-end" gap="xs">
            {isEditing ? (
              <>
                <Button variant="light" size="xs" onClick={handleEdit}>
                  {t('comment.card.editing.buttonConfirm')}
                </Button>
                <Button
                  variant="subtle"
                  size="xs"
                  color="red"
                  onClick={() => setIsEditing(false)}
                >
                  {t('comment.card.editing.buttonCancel')}
                </Button>
              </>
            ) : (
              <>
                {auth.user?.login === comment.author.login && (
                  <>
                    <Button
                      variant="subtle"
                      size="xs"
                      onClick={() => setIsEditing(true)}
                    >
                      <IconEdit size={16}/>
                    </Button>
                    <Button
                      variant="subtle"
                      size="xs"
                      color="red"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <IconTrash size={16}/>
                    </Button>
                  </>
                )}
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => setIsReplying((prev) => !prev)}
                >
                  {t('comment.card.reply.label')}
                </Button>
              </>
            )}
          </Group>
        </Stack>
      </Card>

      {isReplying && (
        <Box mt="xs">
          <Textarea
            placeholder={t('comment.card.reply.placeholder')}
            value={replyValue}
            onChange={(e) => setReplyValue(e.currentTarget.value)}
            autosize
            minRows={2}
          />
          <Group justify="flex-end" mt="xs">
            <Button variant="outline" size="xs" onClick={handleReply}>
              {t('comment.card.reply.buttonConfirm')}
            </Button>
          </Group>
        </Box>
      )}

      {isLoadingReplies && <Text c="dimmed">{t('comment.card.loadingReplies')}</Text>}
      {replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onEdit={onEdit}
          onDelete={onDelete}
          isReply={true}
          depth={depth + 2}
          modal={modal}
        />
      ))}

      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('comment.modal.title')}
        zIndex={1000}
        centered
      >
        <Text>{t('comment.modal.message')}</Text>
        <Group justify="flex-end" mt="xs">
          <Button variant="subtle" onClick={() => setIsDeleteModalOpen(false)}>
            {t('comment.modal.buttonCancel')}
          </Button>
          <Button color="red" onClick={handleDelete}>
            {t('comment.modal.buttonConfirm')}
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};
