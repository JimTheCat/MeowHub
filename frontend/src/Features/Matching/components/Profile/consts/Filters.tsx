import {useTranslation} from "react-i18next";

// ANYTHING, FRIENDSHIP, RELATIONSHIP, CHAT
export const LookingFor = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "ANYTHING", label: t('lookingFor.ANYTHING')},
    {value: "FRIENDSHIP", label: t('lookingFor.FRIENDSHIP')},
    {value: "RELATIONSHIP", label: t('lookingFor.RELATIONSHIP')},
    {value: "CHAT", label: t('lookingFor.CHAT')},
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// MALE, FEMALE, OTHER
export const Gender = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "MALE", label: t('gender.MALE')},
    {value: "FEMALE", label: t('gender.FEMALE')},
    {value: "OTHER", label: t('gender.OTHER')}
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// HETEROSEXUAL, HOMOSEXUAL, BISEXUAL, QUESTIONING, ASEXUAL, OTHER
export const Sexuality = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "HETEROSEXUAL", label: t('sexuality.HETEROSEXUAL')},
    {value: "HOMOSEXUAL", label: t('sexuality.HOMOSEXUAL')},
    {value: "BISEXUAL", label: t('sexuality.BISEXUAL')},
    {value: "QUESTIONING", label: t('sexuality.QUESTIONING')},
    {value: "ASEXUAL", label: t('sexuality.ASEXUAL')},
    {value: "OTHER", label: t('sexuality.OTHER')}
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// PRIMARY_SCHOOL, SECONDARY_SCHOOL, HIGH_SCHOOL, COLLEGE, UNIVERSITY, POSTGRADUATE
export const Education = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "PRIMARY_SCHOOL", label: t('education.PRIMARY_SCHOOL')},
    {value: "SECONDARY_SCHOOL", label: t('education.SECONDARY_SCHOOL')},
    {value: "HIGH_SCHOOL", label: t('education.HIGH_SCHOOL')},
    {value: "COLLEGE", label: t('education.COLLEGE')},
    {value: "UNIVERSITY", label: t('education.UNIVERSITY')},
    {value: "POSTGRADUATE", label: t('education.POSTGRADUATE')}
  ]
  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// EVERYDAY, OFTEN, FROM_TIME_TO_TIME, RARELY, NEVER
export const Drinker = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "EVERYDAY", label: t('drinker.EVERYDAY')},
    {value: "OFTEN", label: t('drinker.OFTEN')},
    {value: "FROM_TIME_TO_TIME", label: t('drinker.FROM_TIME_TO_TIME')},
    {value: "RARELY", label: t('drinker.RARELY')},
    {value: "NEVER", label: t('drinker.NEVER')}
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// EVERYDAY, OFTEN, FROM_TIME_TO_TIME, RARELY, NEVER
export const Smoker = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "EVERYDAY", label: t('smoker.EVERYDAY')},
    {value: "OFTEN", label: t('smoker.OFTEN')},
    {value: "FROM_TIME_TO_TIME", label: t('smoker.FROM_TIME_TO_TIME')},
    {value: "RARELY", label: t('smoker.RARELY')},
    {value: "NEVER", label: t('smoker.NEVER')}
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// EVERYDAY, OFTEN, FROM_TIME_TO_TIME, RARELY, NEVER
export const Exercises = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "EVERYDAY", label: t('exercises.EVERYDAY')},
    {value: "OFTEN", label: t('exercises.OFTEN')},
    {value: "FROM_TIME_TO_TIME", label: t('exercises.FROM_TIME_TO_TIME')},
    {value: "RARELY", label: t('exercises.RARELY')},
    {value: "NEVER", label: t('exercises.NEVER')}
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}

// DOG, CAT, BIRD, FISH, RODENT, REPTILE, OTHER
export const Pet = (value?: string) => {
  const {t} = useTranslation("matchingAttributesUtils");

  const data = [
    {value: "DOG", label: t('pets.DOG')},
    {value: "CAT", label: t('pets.CAT')},
    {value: "BIRD", label: t('pets.BIRD')},
    {value: "FISH", label: t('pets.FISH')},
    {value: "RODENT", label: t('pets.RODENT')},
    {value: "REPTILE", label: t('pets.REPTILE')},
    {value: "OTHER", label: t('pets.OTHER')}
  ]

  if (!value) return data;
  return data.find((item) => item.value === value)?.label ?? value;
}