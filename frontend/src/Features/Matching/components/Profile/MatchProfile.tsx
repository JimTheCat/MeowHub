import {
  ActionIcon,
  AspectRatio,
  Button,
  Card,
  Center,
  ComboboxData,
  Divider,
  FileButton,
  Grid,
  Group,
  Image,
  NativeSelect,
  NumberInput,
  ScrollArea,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {IconChevronLeft, IconChevronRight, IconPlus, IconTrash,} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {useMatchingStore} from "../../services/matchingStore.ts";
import {Drinker, Education, Exercises, Gender, LookingFor, Pet, Sexuality, Smoker} from "./consts";
import api from "../../../shared/services/api.ts";
import {PictureDTO} from "../../../shared/types";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";

export const MatchProfile = () => {
  const {profile, fetchProfile} = useMatchingStore();
  const [isChanged, setIsChanged] = useState(false);
  const [isPhotosChanged, setIsPhotosChanged] = useState(false);
  const [photos, setPhotos] = useState<PictureDTO[]>(profile?.pictures ?? []);
  const [originalPhotos, setOriginalPhotos] = useState<PictureDTO[]>([]);
  const alert = useAlert();

  const {t} = useTranslation("matching");

  const form = useForm({
    initialValues: {
      aboutMe: profile?.aboutMe ?? "",
      height: profile?.height ?? "",
      sexuality: profile?.sexuality ?? "",
      education: profile?.education ?? "",
      drinker: profile?.drinker ?? "",
      smoker: profile?.smoker ?? "",
      exercises: profile?.exercises ?? "",
      lookingFor: profile?.lookingFor ?? "",
      pet: profile?.pet ?? ""
    },
    onValuesChange: () => {
      setIsChanged(true);
    },
  });

  useEffect(() => {
    const initializePhotos = async () => {
      if (profile?.pictures) {
        const sorted = [...profile.pictures]
          .sort((a, b) => a.index - b.index)
          .map(photo => ({
            ...photo,
            index: Number(photo.index),
          }));

        setPhotos(sorted);
        setOriginalPhotos(sorted);
      }
    };

    initializePhotos();
  }, [profile?.pictures]);

  const handlePhotoUpload = async (payload: File | null) => {
    if (isPhotosChanged) return;
    if (!payload) return;

    if (photos.length >= 5) {
      alert.showError({
        title: t("profile.card.photos.error.maxPhotos"),
        message: t("profile.card.photos.error.maxPhotosMessage"),
        level: "WARNING",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (payload.size > 10 * 1024 * 1024) {
      alert.showError({
        title: t("profile.card.photos.error.maxSize"),
        message: t("profile.card.photos.error.maxSizeMessage"),
        level: "WARNING",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", payload);
    formData.append("pictureIndex", photos.length.toString());

    try {
      const response = await api.post<PictureDTO>("/api/matching-profile/pictures", formData);

      alert.showError({
        title: t("profile.card.photos.success"),
        message: t("profile.card.photos.successMessage"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      })

      setPhotos((prev) => [...prev, response.data]); // Add the new photo to the list
      setOriginalPhotos((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handlePhotoRemove = async (photoId: string) => {
    if (photoId) {
      try {
        await api.delete(`/api/matching-profile/pictures/${photoId}`);
        setPhotos((prev) => prev.filter((photo) => photo.id !== photoId)); // Remove the photo from the list
        setOriginalPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    }
  };

  const movePhoto = (currentIndex: number, direction: "left" | "right") => {
    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

    const updatedPhotos = photos.map(photo => ({...photo}));
    const movedPhoto = updatedPhotos[currentIndex];

    movedPhoto.index = newIndex;
    updatedPhotos[newIndex].index = currentIndex;

    [updatedPhotos[currentIndex], updatedPhotos[newIndex]] =
      [updatedPhotos[newIndex], updatedPhotos[currentIndex]];

    setPhotos(updatedPhotos);
    setIsPhotosChanged(true);
  };

  const handleReset = () => {
    const restoredPhotos = originalPhotos.map(photo => ({
      ...photo,
      index: photo.index
    }));

    setPhotos(restoredPhotos);
    setIsPhotosChanged(false);
  };

  const handleSubmit = async () => {
    // Update the indexes in the backend
    const pictureIndexes = photos.reduce((acc, photo, idx) => {
      acc[photo.id] = idx;
      return acc;
    }, {} as Record<string, number>);

    try {
      await api.post("/api/matching-profile/pictures/indexes", pictureIndexes);
      setOriginalPhotos([...photos]);
      setIsPhotosChanged(false);
      await fetchProfile();

      alert.showError({
        title: t("profile.card.photos.successIndex"),
        message: t("profile.card.photos.successIndexMessage"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating photo indexes:", error);
    }
  };

  type FormProps = {
    aboutMe: string | null
    height: string | number | null
    lookingFor: string | null
    sexuality: string | null
    education: string | null
    drinker: string | null
    smoker: string | null
    exercises: string | null
    pet: string | null
  }

  const handleProfileSubmit = async (values: FormProps) => {
    try {
      await api.post("/api/matching-profile/update", values);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      alert.showError({
        title: t("profile.card.infoSection.alert.success"),
        message: t("profile.card.infoSection.alert.successMessage"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      })

      setIsChanged(false);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await handleProfileSubmit(values);
        console.log({...values});
      })}
      onReset={(event) => {
        event.preventDefault();
        form.onReset(event);
        setIsChanged(false);
      }}
    >
      <Stack gap={"md"} align={"center"} justify={"center"} py={"lg"} px={"xl"}>
        <Card w={"50vw"} mah={"90vh"} withBorder component={ScrollArea}>
          <Title order={2} mb="md">
            {t("profile.card.imageSection.title")}
          </Title>

          <Grid mx={"8px"} gutter={"md"} justify={'center'}>
            {[...photos].sort((a, b) => a.index - b.index).map((photo, index) => (
              <Grid.Col span={4} key={photo.id}>
                <Card shadow="sm" withBorder>
                  <AspectRatio ratio={1}>
                    <Image
                      src={photo.url}
                      width={"auto"}
                      alt={t("profile.card.photos.altText", {index: index + 1})}
                    />
                  </AspectRatio>
                  <Group mt='md' justify={"flex-start"} align={"center"}>
                    <Tooltip
                      label={t("profile.card.photos.tooltip.moveLeft")}
                      disabled={index === 0}
                    >
                      <ActionIcon
                        onClick={() => movePhoto(index, "left")}
                        disabled={index === 0}
                      >
                        <IconChevronLeft/>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip
                      label={t("profile.card.photos.tooltip.moveRight")}
                      disabled={index === photos.length - 1}
                    >
                      <ActionIcon
                        onClick={() => movePhoto(index, "right")}
                        disabled={index === photos.length - 1}
                      >
                        <IconChevronRight/>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip
                      label={
                        isPhotosChanged ? t("profile.card.photos.tooltip.removeDisabled")
                          : t("profile.card.photos.tooltip.remove")
                      }
                    >
                      <ActionIcon
                        color="red"
                        onClick={() => handlePhotoRemove(photo.id)}
                        disabled={isPhotosChanged}
                      >
                        <IconTrash size={16}/>
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
            {photos.length < 5 &&
              Array.from({length: 5 - photos.length}).map((_, idx) => (
                <Grid.Col span={4} key={`placeholder-${idx + 1}`}>
                  <Card shadow="sm" withBorder pos={"relative"}>
                    <AspectRatio ratio={1}>
                      <Image src={""} style={{visibility: "hidden"}}/>
                    </AspectRatio>
                    <ActionIcon
                      style={{"--ai-hover": "transparent", cursor: "auto"}}
                      color="transparent"
                      mt={"sm"}
                    />
                    <Center pos={"absolute"} top={"50%"} left={"50%"} style={{transform: "translate(-50%, -50%)"}}>
                      {/* If isPhotosChanged then you cannot upload an Image*/}
                      {isPhotosChanged && <IconPlus color={'gray'} style={{cursor: "not-allowed"}} size={48}/>}
                      {!isPhotosChanged &&
                          <FileButton onChange={handlePhotoUpload} accept="image/*">
                            {(props) => <IconPlus style={{cursor: "pointer"}} size={48} {...props} />}
                          </FileButton>
                      }
                    </Center>
                  </Card>
                </Grid.Col>
              ))}
          </Grid>

          {/* Buttons for Picture section */}
          {isPhotosChanged && (
            <Group mt={"md"} justify={"space-around"}>
              <Button color="red" radius="lg" onClick={handleReset}>
                {t("profile.button.cancel.label")}
              </Button>
              <Button color="green" radius="lg" onClick={handleSubmit}>
                {t("profile.button.submit.label")}
              </Button>
            </Group>
          )}

          <Divider my={"md"}/>

          <Title order={2}>{t("profile.card.infoSection.title")}</Title>
          <Stack gap="lg">
            {/* Name */}
            <TextInput
              disabled // Name is not editable for now
              placeholder={t("profile.card.infoSection.name.placeholder")}
              label={t("profile.card.infoSection.name.label")}
              value={profile?.name}
            />
            {/* About me */}
            <Textarea
              placeholder={t("profile.card.infoSection.bio.placeholder")}
              label={t("profile.card.infoSection.bio.label")}
              key={form.key("aboutMe")}
              {...form.getInputProps("aboutMe")}
            />
            <SimpleGrid cols={2}>
              {/* Age */}
              <NumberInput
                label={t("profile.card.infoSection.age.label")}
                disabled // Age is not editable for now
                min={16}
                value={profile?.age}
              />
              {/* Height */}
              <NumberInput
                label={t("profile.card.infoSection.height.label")}
                min={120}
                max={300}
                key={form.key("height")}
                {...form.getInputProps("height")}
              />
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
                disabled
                value={[profile?.gender ?? ""]}
              />
              {/* Sexuality */}
              <NativeSelect
                label={t("profile.card.infoSection.sexuality.label")}
                data={Sexuality() as ComboboxData}
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