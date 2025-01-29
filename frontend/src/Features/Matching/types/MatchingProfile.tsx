import {PictureDTO} from "../../shared/types";

export type MatchingProfile = {
  id: number;
  name: string;
  age: number;
  pictures: PictureDTO[];
  aboutMe: string;
  lookingFor: string;
  gender: string;
  location: string;
  sexuality: string;
  education: string;
  drinker: string;
  smoker: string;
  exercises: string;
  pet: string;
};
