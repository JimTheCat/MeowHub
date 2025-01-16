import {ActionIcon, Avatar, Card, Group, Menu, rem, Stack, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {BasicUserInfo} from "../../../shared/types";
import {IconDots, IconUsersMinus} from "@tabler/icons-react";
import {ModificationModal} from "../../../shared/components/ModificationModal";
import api from "../../../shared/services/api.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";

export const FriendDetailed = ({
                                 friend,
                                 onRemove,
                               }: {
  friend: BasicUserInfo;
  onRemove: () => void; // Function to refresh friends list
}) => {
  const navigate = useNavigate();
  const alert = useAlert();

  const handleRemoval = () => {
    api.post(`/api/relations/${friend.login}/delete-friend`).then((response) => {
      if (response.status === 200) {
        alert.showError({
          title: "Success",
          message: "Friend removed",
          level: "INFO",
          timestamp: new Date().toISOString(),
        });
        onRemove();
      }
    });
  };

  return (
    <Card p="lg" withBorder shadow={"lg"} style={{cursor: "pointer"}}>
      {/*Friend detailed view*/}
      <Group justify={"space-between"}>
        <Group onClick={() => navigate(`/profile/@${friend.login}`)}>
          <Avatar src={friend.profilePictureUrl} size={"lg"} radius={180}/>
          <Stack gap={0}>
            <Text>{friend.name}</Text>
            <Text>@{friend.login}</Text>
          </Stack>
        </Group>
        <Menu radius={"sm"} shadow="xl" width={"auto"} closeOnItemClick>
          <Menu.Target>
            <ActionIcon size="lg" color="gray" radius={"xl"} variant={"subtle"}>
              <IconDots stroke={1.5}/>
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Manage</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={<IconUsersMinus style={{width: rem(14), height: rem(14)}}/>}
              onClick={() =>
                ModificationModal({
                  handleAction: handleRemoval,
                  title: "Remove friend",
                  buttonConfirmText: "Remove",
                  buttonConfirmColor: "red",
                  childrenContent: (
                    <Text>
                      Are you sure that you want to remove your friend {friend.login}?
                    </Text>
                  ),
                })
              }
            >
              Remove friend
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
};
