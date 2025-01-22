import {ActionIcon, AspectRatio, Avatar, Box, Card, Group, Image, Overlay, Skeleton, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {ProfileUser} from "../../../shared/types";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {useParams} from "react-router-dom";
import {IconPencil} from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import {UploadProfilePicture} from "./components/UploadProfilePicture";
import api from "../../../shared/services/api.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import {InvitationStatus} from "../../../shared/components/InvitationStatus";
import {useTranslation} from "react-i18next";


export const CardProfileTop = (props: { userDetails: ProfileUser | null }) => {

  const auth = useAuthStore();
  const alert = useAlert();
  const {userTag} = useParams();
  const isProfileOfLoggedUser = userTag === auth.user?.tag;
  const [isProfilePictureLoaded, setIsProfilePictureLoaded] = useState(false);
  const [changedProfilePicture, setChangedProfilePicture] = useState<File | null>(null);
  const profilePictureRef = useRef(changedProfilePicture);
  const [isHovered, setIsHovered] = useState(false);
  const {t} = useTranslation('profile');

  useEffect(() => {
    if (!props.userDetails?.profilePicture) {
      setIsProfilePictureLoaded(true);
    }
  }, [props.userDetails?.profilePicture]);

  const handleSetProfilePicture = (file: File | null) => {
    setChangedProfilePicture(file);
    profilePictureRef.current = file;
  }

  const handleProfilePictureChange = () => {
    if (profilePictureRef.current) {
      const formData = new FormData();
      formData.append('file', profilePictureRef.current);

      api.post('/api/profiles/pictures', formData).then(r => {
        if (r.status === 200) {
          alert.showError({
            title: t('profileTop.alert.title'),
            message: t('profileTop.alert.message'),
            level: "INFO",
            timestamp: new Date().toISOString(),
          })
          // refresh profile photo
          window.location.reload();
        }
      })
    }
  };

  const UploadNewImageModal = () => modals.openConfirmModal({
    title: t('profileTop.modal.title'),
    children: (
      <UploadProfilePicture
        setImage={handleSetProfilePicture}
        previewButton={t('upload.preview.button')}
        dropzoneTitle={t('upload.dropzone.title')}
        dropzoneMessage={t('upload.dropzone.message')}
      />
    ),
    labels: {confirm: t('profileTop.modal.labels.confirm'), cancel: t('profileTop.modal.labels.cancel')},
    confirmProps: {color: 'green'},
    size: "auto",
    centered: true,
    closeOnClickOutside: false,
    onConfirm: handleProfilePictureChange,
  });

  if (!props.userDetails) {
    return (
      <Card shadow="sm" padding="lg" radius="md" w="fit-content" withBorder>
        <Skeleton height={150} width={500}/>
        <Box pos="relative" mt={-35}>
          <Skeleton circle height={120} width={120}/>
          <Stack justify="flex-start" gap={0} mt="md">
            <Skeleton height={20} width={200}/>
            <Skeleton height={20} width={150}/>
          </Stack>
        </Box>
      </Card>
    );
  }


  return (
    <Card shadow="sm" padding="lg" radius="md" w={"fit-content"} withBorder>
      <Card.Section withBorder w={500}>
        <Image h={150} fit={"cover"}
               src={"https://c4.wallpaperflare.com/wallpaper/264/666/478/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg"}/>
      </Card.Section>

      <Box pos={"relative"} mt={-35}>
        <Group justify={"space-between"} align={'flex-end'}>
          <Group align={'flex-end'}>
            {!isProfilePictureLoaded && (
              <Skeleton
                circle
                height={120}
              />
            )}

            <Box
              pos="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{width: "fit-content"}}
            >
              <AspectRatio ratio={1}>
                <Avatar
                  src={props.userDetails.profilePictureUrl}
                  w={"auto"}
                  size={100}
                  color="dark"
                  onLoad={() => setIsProfilePictureLoaded(true)}
                  bd="2px solid dimmed"
                  variant="filled"
                />
                {isHovered && isProfileOfLoggedUser && <Overlay radius={180} color={'#000'} backgroundOpacity={0.5}/>}
              </AspectRatio>

              {isProfileOfLoggedUser && isHovered && (
                <ActionIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,
                  }}
                  variant="subtle"
                  radius="180"
                  color="gray"
                  size="100"
                  onClick={UploadNewImageModal}
                >
                  <IconPencil/>
                </ActionIcon>
              )}
            </Box>

            <Stack justify="flex-end" gap={0} mt={"lg"}>
              <Group justify={"center"} gap={"xs"} align={"baseline"}>
                <Text size={"xl"}>
                  {props.userDetails.name} {props.userDetails.surname}
                </Text>
              </Group>
              <Text size={"md"} c="dimmed">@{props.userDetails.login}</Text>
            </Stack>
          </Group>
          {!isProfileOfLoggedUser &&
              <Group>
                  <InvitationStatus user={props.userDetails}/>
              </Group>
          }
        </Group>

        <Stack justify={"flex-start"} gap={0} mt={'md'}>
          <Text>{t('profileTop.joined', {date: new Date(props.userDetails.createdAt).toLocaleDateString()})}</Text>
          <Text>{t('profileTop.friends', {length: props.userDetails.friends.length})}</Text>
        </Stack>
      </Box>
    </Card>
  );
}