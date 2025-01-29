import {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {
  IconBarbellFilled,
  IconGenderAgender,
  IconGenderBigender,
  IconGenderFemale,
  IconGenderMale,
  IconGlassFullFilled,
  IconPawFilled,
  IconSchool,
  IconSmoking
} from "@tabler/icons-react";
import {MatchingProfile} from "../../Matching/types";

const icons: Record<string, ReactNode> = {
  smoker: <IconSmoking size={16}/>,
  exercises: <IconBarbellFilled size={16}/>,
  gender: null,
  sexuality: <IconGenderBigender size={16}/>,
  education: <IconSchool size={16}/>,
  drinker: <IconGlassFullFilled size={16}/>,
  pet: <IconPawFilled size={16}/>,
};

const useMatchingAttributesUtils = () => {
  const {t} = useTranslation("matchingAttributesUtils");

  const translateValue = (field: string, value: string): string => {
    return t(`${field}.${value}`, value);
  };

  const generateAttributeDisplay = (
    field: string,
    value: string,
    fullWidth?: boolean
  ): {
    name: string;
    content: string;
    badgeFullWidth?: boolean;
    icon?: ReactNode;
  } => {
    const translatedContent = translateValue(field, value);
    const translatedName = translateValue(field, field);

    let icon = icons[field];

    if (field === "gender") {
      switch (value) {
        case "MALE":
          icon = <IconGenderMale size={16}/>;
          break;
        case "FEMALE":
          icon = <IconGenderFemale size={16}/>;
          break;
        case "OTHER":
          icon = <IconGenderAgender size={16}/>;
          break;
        default:
          icon = null;
      }
    }

    return {
      name: translatedName,
      content: translatedContent,
      badgeFullWidth: fullWidth,
      icon,
    };
  };

  return {generateAttributeDisplay};
};

export const useProfileAttributes = () => {
  const {generateAttributeDisplay} = useMatchingAttributesUtils();

  const processProfileAttributes = (profile: MatchingProfile, fieldsToInclude: string[], fullWidth?: boolean) => {

    return fieldsToInclude
      .filter((field) => profile[field as keyof MatchingProfile] !== null) // Remove null fields
      .map((field) => {
        const value = profile[field as keyof MatchingProfile] as string;
        return generateAttributeDisplay(field, value, fullWidth);
      });
  };

  return {processProfileAttributes};
};
