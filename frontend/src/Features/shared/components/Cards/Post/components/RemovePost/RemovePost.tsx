import {Menu, rem, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {ModificationModal} from "../../../../ModificationModal";
import api from "../../../../../services/api.ts";

type RemovePostProps = {
  postId?: string;
}

export const RemovePost = (props: RemovePostProps) => {
  const handleRemoval = () => {
    api.delete(`/api/posts/${props.postId}`);
  };

  return (
    <Menu.Item
      color="red"
      leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
      onClick={() => ModificationModal({
        handleAction: handleRemoval,
        title: 'Remove post',
        buttonConfirmText: 'Remove',
        buttonConfirmColor: 'red',
        childrenContent: <Text>Are you sure that you want to remove your post?</Text>
      })}
    >
      Remove post
    </Menu.Item>
  );
}