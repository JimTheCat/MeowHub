import {Menu, rem, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {ModificationModal} from "../../../../ModificationModal";
import api from "../../../../../services/api.ts";
import {useTranslation} from "react-i18next";

type RemovePostProps = {
  postId?: string;
}

export const RemovePost = (props: RemovePostProps) => {
  const {t} = useTranslation('postComponent');
  const handleRemoval = () => {
    api.delete(`/api/posts/${props.postId}`);
  };

  return (
    <Menu.Item
      color="red"
      leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
      onClick={() => ModificationModal({
        handleAction: handleRemoval,
        title: t('removePost.title'),
        buttonConfirmText: t('removePost.buttonConfirm'),
        buttonCancelText: t('removePost.buttonCancel'),
        buttonConfirmColor: 'red',
        childrenContent: <Text>{t('removePost.message')}</Text>
      })}
    >
      {t('removePost.children')}
    </Menu.Item>
  );
}