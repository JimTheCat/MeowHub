import {ModificationModal} from "../../../../ModificationModal";
import {IconPencil} from "@tabler/icons-react";
import {Menu, rem} from "@mantine/core";
import {useRef, useState} from "react";
import {ModalRichContent} from "../../../../../consts";
import api from "../../../../../services/api.ts";
import {useTranslation} from "react-i18next";

type EditPostProps = {
  content?: string;
  postId?: string;
}

export const EditPost = (props: EditPostProps) => {
  const {t} = useTranslation('postComponent');
  const [content, setContent] = useState(props.content ?? '');
  const contentRef = useRef(content);

  const handleContentChange = (html: string) => {
    console.log('Content changed: ', html);
    setContent(html);
    contentRef.current = html;
  }

  const handleEditPost = () => {
    api.put(`/api/posts/${props.postId}`, null, {params: {content: contentRef.current}});
  };

  return (
    <Menu.Item
      leftSection={<IconPencil style={{width: rem(14), height: rem(14)}}/>}
      onClick={() => ModificationModal({
        handleAction: handleEditPost,
        title: t('editPost.title'),
        buttonConfirmText: t('editPost.buttonConfirm'),
        buttonConfirmColor: 'blue',
        buttonCancelText: t('editPost.buttonCancel'),
        content: content,
        childrenContent: <ModalRichContent content={content} handleContentChange={handleContentChange}/>
      })}
    >
      {t('editPost.children')}
    </Menu.Item>
  );
}