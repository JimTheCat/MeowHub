import {Menu, rem, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {ModificationModal} from "../../../../ModificationModal";

type RemovePostProps = {
  postId?: string;
}

export const RemovePost = (props: RemovePostProps) => {
  const handleRemoval = () => {
    // TODO: Replace with actual removal logic
    console.log('Remove post: ', props.postId);
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