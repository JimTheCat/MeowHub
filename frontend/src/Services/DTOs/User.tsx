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
  "profilePicture": string | null
}