import {PictureDTO} from "./Picture.tsx";

export type PostDTO = {
  id: string,
  content: string,
  createdAt: string,
  numberOfComments: number,
  author: {
    id: string;
    name: string;
    surname: string;
    login: string;
    profilePictureUrl: string | null;
  },
  pictures?: PictureDTO[]
};
