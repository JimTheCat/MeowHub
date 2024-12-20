import {ModificationModal} from "../../../../ModificationModal";
import {IconPencil} from "@tabler/icons-react";
import {Menu, rem} from "@mantine/core";
import {useRef, useState} from "react";
import {ModalRichContent} from "../../../../../consts";

type EditPostProps = {
  content?: string;
  postId?: string;
}

export const EditPost = (props: EditPostProps) => {
  const [content, setContent] = useState(props.content ?? '');
  const contentRef = useRef(content);

  const handleContentChange = (html: string) => {
    console.log('Content changed: ', html);
    setContent(html);
    contentRef.current = html;
  }

  const handleEditPost = () => {
    // TODO: Replace with actual edit logic
    console.log('Edit post: ', contentRef.current);
  };

  return (
    <Menu.Item
      leftSection={<IconPencil style={{width: rem(14), height: rem(14)}}/>}
      onClick={() => ModificationModal({
        handleAction: handleEditPost,
        title: 'Edit post',
        buttonConfirmText: 'Save',
        buttonConfirmColor: 'blue',
        content: content,
        childrenContent: <ModalRichContent content={content} handleContentChange={handleContentChange}/>
      })}
    >
      Edit post
    </Menu.Item>
  );
}