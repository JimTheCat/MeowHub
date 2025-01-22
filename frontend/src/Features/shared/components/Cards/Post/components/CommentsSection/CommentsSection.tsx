import {CommentDTO} from "../../types";
import {Divider, Stack, Text} from "@mantine/core";
import {Comment} from "../Comment";
import {useTranslation} from "react-i18next";

type CommentsSectionProps = {
  comments: CommentDTO[];
  onCommentDelete: (id: string) => void;
  onCommentEdit: (id: string, content: string) => void;
  modal: string;
};

export const CommentsSection = ({
                                  comments,
                                  onCommentDelete,
                                  onCommentEdit,
                                  modal,
                                }: CommentsSectionProps) => {
  const {t} = useTranslation("postComponent");

  const renderComments = (comments: CommentDTO[], parentId: string | null = null) =>
    comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div key={comment.id} style={{position: "relative"}}>
          <Comment
            comment={comment}
            onEdit={onCommentEdit}
            onDelete={onCommentDelete}
            modal={modal}
          />
          <Divider mt={'xl'}/>
          {renderComments(comments, comment.id)} {/* Render replies */}
        </div>
      ));

  return (
    <Stack gap={"sm"}>
      {comments.length === 0 ? (
        <Text c={"dimmed"} size="md" ta={"center"}>
          {t("commentsSection.noComments")}
        </Text>
      ) : (
        renderComments(comments)
      )}
    </Stack>
  );
};