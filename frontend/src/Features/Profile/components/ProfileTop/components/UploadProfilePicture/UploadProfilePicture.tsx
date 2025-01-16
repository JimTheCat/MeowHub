import {Dropzone, MIME_TYPES} from "@mantine/dropzone";
import {Button, Group, Image, Paper, rem, Text} from "@mantine/core";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import {useState} from "react";

type UploadProfilePictureProps = {
  setImage: (file: File | null) => void;
};

export const UploadProfilePicture = (props: UploadProfilePictureProps) => {
  const [preview, setPreview] = useState<{ src: string; name: string } | null>(null);

  const handleDrop = (file: File[]) => {
    // Add new image
    props.setImage(file[0]);

    setPreview({src: URL.createObjectURL(file[0]), name: file[0].name});
  };

  const handleRemoveImage = () => {
    props.setImage(null);

    URL.revokeObjectURL(preview!.src);
    setPreview(null);
  };

  return (
    <>
      {!preview &&
          <Dropzone
              onDrop={handleDrop}
              accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif]}
              maxSize={10 * 1024 ** 2}
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
                          Drag images here or click to select file
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                          Attach up to 1 file. File should not exceed 10MB
                      </Text>
                  </div>
              </Group>
          </Dropzone>
      }
      {preview &&
          <Paper maw={"25vw"} withBorder p="sm" radius="md">
              <Image src={preview.src} alt={`preview-0`} width={100} height={100} radius="sm"/>

              <Text size="sm" fw={500} my={"sm"} truncate={"end"}>
                {preview.name}
              </Text>
              <Button fullWidth color="red" size="xs" onClick={() => handleRemoveImage()}>
                  Remove
              </Button>
          </Paper>
      }
    </>
  );
}