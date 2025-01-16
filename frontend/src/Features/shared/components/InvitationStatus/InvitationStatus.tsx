import {BasicUserInfo} from "../../types";
import {ActionIcon, Group, Menu, rem, Text, Tooltip} from "@mantine/core";
import {IconDots, IconSend, IconUserCheck, IconUserPlus, IconUsersMinus, IconUserX} from "@tabler/icons-react";
import {ModificationModal} from "../ModificationModal";
import {useRelationsStore} from "../../services/relationStatus.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import {useEffect, useState} from "react";

export const InvitationStatus = ({user}: { user: BasicUserInfo }) => {
  const [status, setStatus] = useState('none');
  const relationsStore = useRelationsStore();
  const alert = useAlert();

  const handleSendFriendRequest = (login: string) => {
    relationsStore.sendFriendRequest(login).then(() => {
      alert.showError({
        title: 'Success',
        message: 'Friend request sent',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleCancelFriendRequest = (login: string) => {
    relationsStore.cancelFriendRequest(login).then(() => {
      alert.showError({
        title: 'Cancelled',
        message: 'Friend request cancelled',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleAcceptFriendRequest = (login: string) => {
    relationsStore.acceptFriendRequest(login).then(() => {
      alert.showError({
        title: 'Accepted',
        message: 'Friend request accepted',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleRemoveFriend = (login: string) => {
    relationsStore.removeFriend(login).then(() => {
      alert.showError({
        title: 'Removed',
        message: 'Friend removed',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleRemove = () => {
    handleRemoveFriend(user.login);
  }

  useEffect(() => {
    relationsStore.initializeRelations().then(() => {
      setStatus(relationsStore.relations[user.login]);
    });
  }, []);

  switch (status) {
    case 'none':
      return (
        <ActionIcon variant="subtle" color="gray" size="lg" radius="lg"
                    onClick={() => handleSendFriendRequest(user.login)}>
          <IconUserPlus stroke={0.8}/>
        </ActionIcon>
      );
    case 'pendingSent':
      return (
        <Tooltip label={'Twoje zaproszenie zostało już wysłane'}>
          <ActionIcon variant="subtle" color="gray" size="lg" radius="lg">
            <IconSend stroke={0.8}/>
          </ActionIcon>
        </Tooltip>
      );
    case 'pendingReceived':
      return (
        <Group>
          <ActionIcon variant="subtle" color="green" size="lg" radius="lg"
                      onClick={() => handleAcceptFriendRequest(user.login)}>
            <IconUserCheck stroke={0.8}/>
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" size="lg" radius="lg"
                      onClick={() => handleCancelFriendRequest(user.login)}>
            <IconUserX stroke={0.8}/>
          </ActionIcon>
        </Group>
      );
    case 'friends':
      return (
        <Menu radius={'sm'} shadow="xl" width={"auto"} closeOnItemClick>
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
              onClick={() => ModificationModal({
                handleAction: handleRemove,
                title: 'Remove friend',
                buttonConfirmText: 'Remove',
                buttonConfirmColor: 'red',
                childrenContent: <Text>Are you sure that you want to remove your friend {user.login}?</Text>
              })}
            >
              Remove friend
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    default:
      return null;
  }
}