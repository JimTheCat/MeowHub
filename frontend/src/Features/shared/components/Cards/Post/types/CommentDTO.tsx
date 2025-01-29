import {BasicUserInfo} from "../../../../types";

export type CommentDTO = {
  id: string;
  postId: string;
  parentId: string;
  countOfReplies: number;
  createdAt: string;
  modifiedAt: string;
  content: string;
  author: BasicUserInfo;
  isDeleted: boolean;
}