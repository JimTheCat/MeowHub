import {ProfileDetails} from "../../Profile/consts";

export type User = {
  name?: string;
  surname?: string;
  login?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
}

export type BasicUserInfo = {
  "id": string,
  "name": string,
  "surname": string,
  "login": string,
  "profilePictureUrl": string | null
}

export type ProfileUser = BasicUserInfo & ProfileDetails & {
  friends: BasicUserInfo[];
  createdAt: string;
}