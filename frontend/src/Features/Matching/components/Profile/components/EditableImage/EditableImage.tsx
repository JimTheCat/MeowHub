import {Badge, Box, Image, Stack, Text} from "@mantine/core";
import {modals} from "@mantine/modals";

type EditableImageProps = {
  src: string;
  alt: string;
}

const RemoveImageModal = ({image}: { image: string }) => modals.openConfirmModal({
  title: 'Remove image',
  children: (
    <Stack>
      <Text>Are you sure you want to remove this image?</Text>
      <Image h={300} src={image} alt="Photo"/>
    </Stack>
  ),
  labels: {confirm: 'Remove', cancel: "Cancel"},
  confirmProps: {color: 'red'},
  size: "auto",
  centered: true,
  closeOnClickOutside: false,
  onConfirm: () => console.log('Remove image')
});

export const EditableImage = (props: EditableImageProps) => {
  return (
    <Box pos={'relative'}>
      {/* Add button on the top right */}
      <Badge
        onClick={() => RemoveImageModal({image: props.src})}
        style={{cursor: "pointer"}}
        mr={'-5'}
        mt={'-5'}
        right={'0'}
        pos={'absolute'}
        circle
      >
        X
      </Badge>
      <Image src={props.src} alt={props.alt}/>
    </Box>
  );
}