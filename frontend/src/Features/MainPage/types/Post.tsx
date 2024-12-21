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
    profilePicture: string | null;
  },
  photosUrls?: string[]
};
