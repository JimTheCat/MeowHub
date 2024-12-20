import {RichEditor} from "../shared/components/RichEditor";
import {Button, Divider, Group, Modal} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconPencil} from "@tabler/icons-react";
import {useState} from "react";
import api from "../shared/services/api.ts";
import {useAlert} from "../../Providers/AlertProvider.tsx";

export const CreatePost = () => {
  const [opened, {open, close}] = useDisclosure(false);
  const [content, setContent] = useState('');
  const alert = useAlert();

  const handleContentChange = (html: string) => {
    setContent(html);
  }

  const handleCreatePost = () => {
    console.log('Create post: ', content)
    if (!content) {
      alert.showError('Post is empty!');
      return;
    }

    api.post('/api/posts/create', null, {params: {content}}).then((response) => {
      if (response.status === 200) {
        close();
      }
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create post" size={"auto"} centered closeOnClickOutside={false}>
        <RichEditor onContentChange={handleContentChange}/>
        <Divider my={"md"}/>
        <Group justify={"space-between"}>
          <Button color="red" variant="light" onClick={close}>Cancel</Button>
          <Button color="blue" variant="light" onClick={handleCreatePost}>Create</Button>
        </Group>
      </Modal>

      <Button
        variant={"subtle"}
        size={"md"}
        leftSection={<IconPencil/>}
        autoContrast
        fullWidth
        justify={"flex-start"}
        color={"gray"}
        onClick={open}
      >
        Napisz post
      </Button>
    </>
  );
}