import {IconPencil} from "@tabler/icons-react";
import {useRef, useState} from "react";
import api from "../shared/services/api.ts";
import {useAlert} from "../../Providers/AlertProvider.tsx";
import {ModificationModal} from "../shared/components/ModificationModal";
import {Button} from "@mantine/core";
import {ModalRichContent} from "../shared/consts";

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const contentRef = useRef(content);
  const alert = useAlert();

  const handleContentChange = (html: string) => {
    setContent(html);
    contentRef.current = html;
  }

  const handleCreatePost = () => {
    const contentToSave = contentRef.current;
    console.log('Create post: ', contentToSave);
    if (!contentToSave) {
      alert.showError('Post is empty!');
      return;
    }

    api.post('/api/posts/create', null, {params: {content: contentToSave}}).then((response) => {
      if (response.status === 200) {
        close();
      }
    });
  }

  return (
    <Button
      variant={"subtle"}
      size={"md"}
      leftSection={<IconPencil/>}
      autoContrast
      fullWidth
      justify={"flex-start"}
      color={"gray"}
      onClick={() => ModificationModal({
        handleAction: handleCreatePost,
        title: 'Create post',
        buttonConfirmText: 'Create',
        buttonConfirmColor: 'blue',
        childrenContent: <ModalRichContent handleContentChange={handleContentChange}/>
      })}
    >
      Create post
    </Button>

  );
}