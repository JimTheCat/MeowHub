import {PictureDTO} from "../../shared/types";

export type MatchingProfile = {
  id: number;
  name: string;
  age: number;
  height: number | null;
  pictures: PictureDTO[];
  aboutMe: string | null;
  lookingFor: string | null;
  gender: string | null;
  sexuality: string | null;
  education: string | null;
  drinker: string | null;
  smoker: string | null;
  exercises: string | null;
  pet: string | null;
};
