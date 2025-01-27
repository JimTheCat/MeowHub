import {
  Autocomplete,
  Button,
  Card,
  ComboboxData,
  Divider,
  Group,
  NativeSelect,
  ScrollArea,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import {IconGenderBigender,} from "@tabler/icons-react";
import {useCallback, useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {useMatchingStore} from "../../services/matchingStore.ts";
import {Drinker, Education, Exercises, Gender, LookingFor, Pet, Sexuality, Smoker} from "./consts";

declare global {
  interface Window {
    google: any;
  }
}

export const MatchProfile = () => {
  const {profile} = useMatchingStore();
  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  // const [isPhotosChanged, setIsPhotosChanged] = useState(false);
  // const [photos, setPhotos] = useState<File[]>([]);
  // const [originalPhotos, setOriginalPhotos] = useState<PictureDTO[]>(profile?.pictures ?? []);
  // const [profilePhotoIndex, setProfilePhotoIndex] = useState<number | null>(
  //   profile?.pictures.findIndex(photo => photo.isCurrentProfilePicture) ?? null
  // );
  // const [originalProfilePhotoIndex, setOriginalProfilePhotoIndex] = useState<number | null>(null);
  //
  // const [deletedPhotoIds, setDeletedPhotoIds] = useState<string[]>([]);
  const {t} = useTranslation("matching");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: profile?.name ?? "",
      bio: profile?.aboutMe ?? "",
      lookingFor: profile?.lookingFor ?? "FRIENDSHIP",
      gender: profile?.gender ?? "MALE",
      sexuality: profile?.sexuality ?? "HETEROSEXUAL",
      education: profile?.education ?? "UNIVERSITY",
      drinker: profile?.drinker ?? "NEVER",
      smoker: profile?.smoker ?? "NEVER",
      exercises: profile?.exercises ?? "NEVER",
      pet: profile?.pet ?? "DOG",
      location: profile?.location ?? "",
    },
    onValuesChange: (values) => {
      if (values.location) {
        setCityQuery(values.location);
        setIsTyping(true);
      }
      setIsChanged(true);
    },
  });

  const fetchCities = useCallback((input: string) => {
    if (!input || !window.google) return;

    const language = localStorage.getItem("language") ?? "en";
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input,
        types: ["(cities)"],
        language,
      },
      (predictions: any[], status: string) => {
        if (status === "OK" && predictions) {
          setCities(predictions.map((p) => p.description));
        } else {
          setCities([]);
        }
      }
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        fetchCities(cityQuery);
        setIsTyping(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [cityQuery, isTyping, fetchCities]);

  // useEffect(() => {
  //   const checkProfile = async () => {
  //     await fetchProfile();
  //     if (profile) {
  //       setOriginalPhotos(profile.pictures);
  //       const mainPhotoIndex = profile.pictures.findIndex(photo => photo.isCurrentProfilePicture);
  //       setProfilePhotoIndex(mainPhotoIndex >= 0 ? mainPhotoIndex : null);
  //       setOriginalProfilePhotoIndex(mainPhotoIndex >= 0 ? mainPhotoIndex : null);
  //     }
  //   };
  //
  //   if (isLoading || !profile) {
  //     checkProfile();
  //   }
  // }, [fetchProfile, isLoading, profile]);

  // const isPictureDTO = (photo: File | PictureDTO): photo is PictureDTO => {
  //   return (photo as PictureDTO).id !== undefined;
  // };

  // const handlePhotoUpload = (payload: File | null) => {
  //   if (!payload) return;
  //
  //   if (photos.length >= 5) {
  //     alert(t("profile.card.photos.error.maxPhotos"));
  //     return;
  //   }
  //
  //   if (payload.size > 10 * 1024 * 1024) {
  //     alert(t("profile.card.photos.error.maxSize"));
  //     return;
  //   }
  //
  //   setPhotos((prev) => {
  //     const updatedPhotos = [...prev, payload];
  //     if (updatedPhotos.length + originalPhotos.length === 1) {
  //       setProfilePhotoIndex(0);
  //     }
  //     return updatedPhotos;
  //   });
  //   setIsPhotosChanged(true);
  // };
  //
  // const handlePhotoRemove = (index: number, fromOriginal: boolean) => {
  //   if (fromOriginal) {
  //     setDeletedPhotoIds((prev) => [
  //       ...prev,
  //       originalPhotos[index]?.id,
  //     ]);
  //     setOriginalPhotos((prev) => prev.filter((_, i) => i !== index));
  //   } else {
  //     setPhotos((prev) => prev.filter((_, i) => i !== index - originalPhotos.length));
  //   }
  //   setIsPhotosChanged(true);
  // };
  //
  // const movePhoto = (index: number, direction: "left" | "right") => {
  //   const isFromOriginal = index < originalPhotos.length;
  //   const targetIndex = direction === "left" ? index - 1 : index + 1;
  //
  //   if (isFromOriginal) {
  //     // Przesuwamy w originalPhotos
  //     setOriginalPhotos((prev) => {
  //       const updated = [...prev];
  //       [updated[index], updated[targetIndex]] = [
  //         updated[targetIndex],
  //         updated[index],
  //       ];
  //       return updated;
  //     });
  //   } else {
  //     // Przesuwamy w photos
  //     const localIndex = index - originalPhotos.length;
  //     setPhotos((prev) => {
  //       const updated = [...prev];
  //       [updated[localIndex], updated[localIndex + (direction === "left" ? -1 : 1)]] = [
  //         updated[localIndex + (direction === "left" ? -1 : 1)],
  //         updated[localIndex],
  //       ];
  //       return updated;
  //     });
  //   }
  //   setIsPhotosChanged(true);
  // };
  //
  // const handleReset = () => {
  //   setPhotos([]);
  //   setProfilePhotoIndex(originalProfilePhotoIndex);
  //   setIsPhotosChanged(false);
  // };
  //
  // const handleSubmit = async () => {
  //   const extractFileName = (url: string) => {
  //     const parsedUrl = new URL(url);
  //
  //     const filePath = parsedUrl.pathname;
  //     return filePath.substring(filePath.lastIndexOf('/') + 1);
  //   };
  //
  //   const formData = new FormData();
  //   photos.forEach((file) => formData.append("files", file));
  //   if (profilePhotoIndex !== null) {
  //     const mainPhoto = profilePhotoIndex < originalPhotos.length
  //       ? extractFileName(originalPhotos[profilePhotoIndex]?.url)
  //       : photos[profilePhotoIndex - originalPhotos.length].name;
  //     formData.append("profilePictureName", mainPhoto);
  //   }
  //
  //   // Wysłanie nowych zdjęć
  //   await api.post("/api/matching-profile/pictures", formData);
  //
  //   // Usunięcie zdjęć
  //   if (deletedPhotoIds.length > 0) {
  //     await api.delete("/api/matching-profile/pictures", {data: deletedPhotoIds});
  //   }
  //
  // };

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log({...values}))}
      onReset={(event) => {
        event.preventDefault();
        form.onReset(event);
      }}
    >
      <Stack gap={"md"} align={"center"} justify={"center"} py={"lg"} px={"xl"}>
        <Card w={"50vw"} mah={"90vh"} withBorder component={ScrollArea}>
          <Title order={2} mb="md">
            {t("profile.card.imageSection.title")}
          </Title>

          {/*<Grid mx={'8px'} gutter={"md"}>*/}
          {/*  {photos.concat(originalPhotos).map((photo, index) => {*/}
          {/*    const isFromOriginal = isPictureDTO(photo);*/}
          {/*    return (*/}
          {/*      <Grid.Col span={4} key={isFromOriginal ? photo?.id : `file-${index}`}>*/}
          {/*        <Card shadow="sm" withBorder>*/}
          {/*          <AspectRatio ratio={1}>*/}
          {/*            <Image*/}
          {/*              src={isFromOriginal ? photo.url : URL.createObjectURL(photo)}*/}
          {/*              width={'auto'}*/}
          {/*              alt={t("profile.card.photos.altText", {index: index + 1})}*/}
          {/*            />*/}
          {/*          </AspectRatio>*/}
          {/*          <Group justify="space-between" mt="sm" preventGrowOverflow={false}>*/}
          {/*            <Group justify={'flex-start'} align={'center'}>*/}
          {/*              <Tooltip label={t("profile.card.photos.tooltip.moveLeft")}*/}
          {/*                       disabled={index === 0}>*/}
          {/*                <ActionIcon onClick={() => movePhoto(index, "left")}*/}
          {/*                            disabled={index === 0}>*/}
          {/*                  <IconChevronLeft/>*/}
          {/*                </ActionIcon>*/}
          {/*              </Tooltip>*/}
          {/*              <Tooltip label={t("profile.card.photos.tooltip.moveRight")}*/}
          {/*                       disabled={index === photos.length - 1}>*/}
          {/*                <ActionIcon onClick={() => movePhoto(index, "right")}*/}
          {/*                            disabled={index === photos.length - 1}>*/}
          {/*                  <IconChevronRight/>*/}
          {/*                </ActionIcon>*/}
          {/*              </Tooltip>*/}
          {/*              <Tooltip label={t("profile.card.photos.tooltip.remove")}>*/}
          {/*                <ActionIcon color="red" onClick={() => handlePhotoRemove(index, isFromOriginal)}>*/}
          {/*                  <IconTrash size={16}/>*/}
          {/*                </ActionIcon>*/}
          {/*              </Tooltip>*/}
          {/*            </Group>*/}
          {/*            <Tooltip*/}
          {/*              label={profilePhotoIndex === index*/}
          {/*                ? t("profile.card.photos.button.isMain")*/}
          {/*                : t("profile.card.photos.button.setMain")}>*/}
          {/*              <ActionIcon onClick={() => setProfilePhotoIndex(index)}>*/}
          {/*                {profilePhotoIndex === index ? <IconStarFilled size={16}/> : <IconStar size={16}/>}*/}
          {/*              </ActionIcon>*/}
          {/*            </Tooltip>*/}
          {/*          </Group>*/}
          {/*        </Card>*/}
          {/*      </Grid.Col>*/}
          {/*    )*/}
          {/*  })}*/}
          {/*  {originalPhotos.length + photos.length < 5 && (*/}
          {/*    Array.from({length: 5 - originalPhotos.length - photos.length}).map((_, idx) => (*/}
          {/*      <Grid.Col span={4} key={`placeholder-${idx}`}>*/}
          {/*        <Card shadow="sm" withBorder pos={'relative'}>*/}
          {/*          <AspectRatio ratio={1}>*/}
          {/*            <Image src={''} style={{visibility: 'hidden'}}/>*/}
          {/*          </AspectRatio>*/}
          {/*          <ActionIcon style={{'--ai-hover': 'transparent', cursor: 'auto'}} color='transparent' mt={'sm'}/>*/}
          {/*          <Center pos={'absolute'} top={'50%'} left={'50%'} style={{transform: 'translate(-50%, -50%)'}}>*/}
          {/*            <FileButton onChange={handlePhotoUpload} accept="image/*">*/}
          {/*              {*/}
          {/*                (props) => (*/}
          {/*                  <IconPlus style={{cursor: 'pointer'}} size={48} {...props}/>*/}
          {/*                )*/}
          {/*              }*/}
          {/*            </FileButton>*/}
          {/*          </Center>*/}
          {/*        </Card>*/}
          {/*      </Grid.Col>*/}
          {/*    ))*/}
          {/*  )}*/}
          {/*</Grid>*/}

          {/*/!*Buttons for Picture section*!/*/}
          {/*{isPhotosChanged &&*/}
          {/*    <Group mt={"md"} justify={"space-around"}>*/}
          {/*        <Button color="red" radius="lg" onClick={handleReset}>*/}
          {/*          {t("profile.button.cancel.label")}*/}
          {/*        </Button>*/}
          {/*        <Button color="green" radius="lg" onClick={handleSubmit}>*/}
          {/*          {t("profile.button.submit.label")}*/}
          {/*        </Button>*/}
          {/*    </Group>*/}
          {/*}*/}

          <Divider my={"md"}/>

          <Title order={2}>{t("profile.card.infoSection.title")}</Title>
          <Stack gap="lg">
            {/* Name */}
            <TextInput
              placeholder={t("profile.card.infoSection.name.placeholder")}
              label={t("profile.card.infoSection.name.label")}
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            {/* About me */}
            <Textarea
              placeholder={t("profile.card.infoSection.bio.placeholder")}
              label={t("profile.card.infoSection.bio.label")}
              key={form.key("bio")}
              {...form.getInputProps("bio")}
            />
            <SimpleGrid cols={2}>
              {/* Looking for */}
              <NativeSelect
                label={t("profile.card.infoSection.lookingFor.label")}
                data={LookingFor() as ComboboxData}
                {...form.getInputProps("lookingFor")}
              />
              {/* Gender */}
              <NativeSelect
                label={t("profile.card.infoSection.gender.label")}
                data={Gender() as ComboboxData}
                {...form.getInputProps("gender")}
              />
              {/* Sexuality */}
              <NativeSelect
                label={t("profile.card.infoSection.sexuality.label")}
                data={Sexuality() as ComboboxData}
                leftSection={<IconGenderBigender/>}
                {...form.getInputProps("sexuality")}
              />
              {/* Education */}
              <NativeSelect
                label={t("profile.card.infoSection.education.label")}
                data={Education() as ComboboxData}
                {...form.getInputProps("education")}
              />
              {/* Drinker */}
              <NativeSelect
                label={t("profile.card.infoSection.drinker.label")}
                data={Drinker() as ComboboxData}
                {...form.getInputProps("drinker")}
              />
              {/* Smoker */}
              <NativeSelect
                label={t("profile.card.infoSection.smoker.label")}
                data={Smoker() as ComboboxData}
                {...form.getInputProps("smoker")}
              />
              {/* Exercises */}
              <NativeSelect
                label={t("profile.card.infoSection.exercises.label")}
                data={Exercises() as ComboboxData}
                {...form.getInputProps("exercises")}
              />
              {/* Pet */}
              <NativeSelect
                label={t("profile.card.infoSection.pet.label")}
                data={Pet() as ComboboxData}
                {...form.getInputProps("pet")}
              />
            </SimpleGrid>

            {/* Location */}
            <Autocomplete
              data={cities}
              label={t("profile.card.infoSection.location.label")}
              key={form.key("location")}
              {...form.getInputProps("location")}
              placeholder={t("profile.card.infoSection.location.placeholder")}
            />
          </Stack>
        </Card>

        {isChanged && (
          <Group justify={"space-between"}>
            <Button type={"reset"} color="red" radius="lg">
              {t("profile.button.cancel.label")}
            </Button>
            <Button type={"submit"} color="green" radius="lg">
              {t("profile.button.submit.label")}
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
};
