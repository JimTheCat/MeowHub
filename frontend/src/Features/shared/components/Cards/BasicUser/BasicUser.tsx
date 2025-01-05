import {BasicUserInfo} from "../../../types";
import {Avatar, Group, MantineSize, Stack, Text} from "@mantine/core";

type BasicUserType = {
  user: BasicUserInfo,
  avatarSize?: MantineSize
  tagVisible?: boolean
}

export const BasicUser = (props: BasicUserType) => {

  const avatarSize = props.avatarSize ? props.avatarSize : 'xl';
  const tagVisible = props.tagVisible ? props.tagVisible : true;

  return (
    <Group>

      <Avatar
        radius={180}
        size={avatarSize}
        src={props.user.profilePicture}
      />

      <Stack gap={0}>
        <Text>{props.user.name} {props.user.surname}</Text>
        {tagVisible &&
            <Text>@{props.user.login}</Text>
        }
      </Stack>
    </Group>
  );
}