import {BasicUserInfo} from "../../types";
import {ActionIcon, Group, Menu, rem, Text, Tooltip} from "@mantine/core";
import {IconDots, IconSend, IconUserCheck, IconUserPlus, IconUsersMinus, IconUserX} from "@tabler/icons-react";
import {ModificationModal} from "../ModificationModal";
import {useRelationsStore} from "../../services/relationStatus.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const InvitationStatus = ({user}: { user: BasicUserInfo }) => {
  const [status, setStatus] = useState('none');
  const relationsStore = useRelationsStore();
  const alert = useAlert();
  const {t} = useTranslation('invitationComponent');

  const handleSendFriendRequest = (login: string) => {
    relationsStore.sendFriendRequest(login).then(() => {
      alert.showError({
        title: t('alert.send.title'),
        message: t('alert.send.message'),
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleCancelFriendRequest = (login: string) => {
    relationsStore.cancelFriendRequest(login).then(() => {
      alert.showError({
        title: t('alert.cancel.title'),
        message: t('alert.cancel.message'),
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleAcceptFriendRequest = (login: string) => {
    relationsStore.acceptFriendRequest(login).then(() => {
      alert.showError({
        title: t('alert.accept.title'),
        message: t('alert.accept.message'),
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleRemoveFriend = (login: string) => {
    relationsStore.removeFriend(login).then(() => {
      alert.showError({
        title: t('alert.remove.title'),
        message: t('alert.remove.message'),
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
        <Tooltip label={t('pendingSent.tooltip')}>
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
            <Menu.Label>{t('friendsMenu.label')}</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={<IconUsersMinus style={{width: rem(14), height: rem(14)}}/>}
              onClick={() => ModificationModal({
                handleAction: handleRemove,
                title: t('friendsMenu.modal.title'),
                buttonConfirmText: t('friendsMenu.modal.buttonConfirm'),
                buttonCancelText: t('friendsMenu.modal.buttonCancel'),
                buttonConfirmColor: 'red',
                childrenContent: <Text>{t('friendsMenu.modal.content', {name: user.login})}</Text>
              })}
            >
              {t('friendsMenu.item')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    default:
      return null;
  }
}