import {useState} from "react";
import {Dropzone, MIME_TYPES} from "@mantine/dropzone";
import {Button, Group, Image, Paper, rem, SimpleGrid, Text} from "@mantine/core";
import {ModalRichContent} from "../../../shared/consts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";

type PostFormProps = {
  handleContentChange: (html: string) => void;
  setImages: (files: File[]) => void;
  dropzoneText: string;
  dropzoneDimmedText: string;
};

export const PostForm = (props: PostFormProps) => {
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ src: string; name: string }[]>([]);
  const alert = useAlert();
  const {t} = useTranslation('createPost');

  // Function to handle dropping images
  const handleDrop = (files: File[]) => {
    if (localImages.length + files.length > 5) {
      alert.showError({
        title: t('createPostForm.alert.tooManyFiles.title'),
        message: t('createPostForm.alert.tooManyFiles.message'),
        level: "WARNING",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Add new images to the existing ones
    const updatedImages = [...localImages, ...files];
    setLocalImages(updatedImages);
    props.setImages(updatedImages); // Passing to CreatePost

    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => ({src: URL.createObjectURL(file), name: file.name})),
    ]);
  };

  // Function to remove an image
  const handleRemoveImage = (index: number) => {
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    props.setImages(updatedImages); // Passing to CreatePost

    URL.revokeObjectURL(previews[index].src);
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <>
      <ModalRichContent handleContentChange={props.handleContentChange}/>

      <Dropzone
        onDrop={handleDrop}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif]}
        maxSize={10 * 1024 ** 2}
        multiple
      >
        <Group justify="center" gap="xl" mih={120} style={{pointerEvents: "none"}}>
          <Dropzone.Accept>
            <IconUpload
              style={{width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)"}}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)"}}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)"}}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              {props.dropzoneText}
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              {props.dropzoneDimmedText}
            </Text>
          </div>
        </Group>
      </Dropzone>

      {previews.length > 0 && (
        <SimpleGrid cols={2} mt="md">
          {previews.map((preview, index) => (
            <Paper maw={"25vw"} withBorder p="sm" radius="md" key={index + 1}>
              <Image src={preview.src} alt={`preview-${index}`} width={100} height={100} radius="sm"/>

              <Text size="sm" fw={500} my={"sm"} truncate={"end"}>
                {preview.name}
              </Text>
              <Button fullWidth color="red" size="xs" onClick={() => handleRemoveImage(index)}>
                {t('createPostForm.image.button.label')}
              </Button>
            </Paper>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
