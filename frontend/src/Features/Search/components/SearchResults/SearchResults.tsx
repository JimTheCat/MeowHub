import {ActionIcon, Avatar, Card, Divider, Group, Menu, rem, Stack, Text, Tooltip} from '@mantine/core';
import {useNavigate, useSearchParams} from "react-router-dom";
import {BasicUserInfo} from "../../../shared/types";
import {IconDots, IconSend, IconUserCheck, IconUserPlus, IconUsersMinus, IconUserX} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import api from "../../../shared/services/api.ts";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import {ModificationModal} from "../../../shared/components/ModificationModal";

type RelationStatus = 'none' | 'friends' | 'pendingSent' | 'pendingReceived';

const fetchPaginatedResults = async (url: string) => {
  const results: BasicUserInfo[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await api.get(url, {params: {page}});
    const {content, last} = response.data;
    results.push(...content);
    hasMore = !last;
    page++;
  }

  return results;
};

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [filteredUsers, setFilteredUsers] = useState<BasicUserInfo[]>([]);
  const [relations, setRelations] = useState<Record<string, RelationStatus>>({});
  const loggedInUser = useAuthStore();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (query) {
      // Fetch users matching the query
      api.get('/api/users/search', {
        params: {query},
      }).then((response) => {
        const users = response.data.content;
        setFilteredUsers(users);

        // Fetch relations status for each user
        fetchRelations(users.map((user: BasicUserInfo) => user.login));
      });
    }
  }, [query]);

  const fetchRelations = async (logins: string[]) => {
    try {
      // Fetch list of friends (paginated)
      const friends = await fetchPaginatedResults('/api/relations/friends');

      // Fetch list of pending relations (paginated)
      const pendingSent = await fetchPaginatedResults('/api/relations/pending');
      const pendingReceived = await fetchPaginatedResults('/api/relations/received');

      // Update relations status
      const newRelations: Record<string, RelationStatus> = {};
      logins.forEach((login) => {
        if (friends.some((friend) => friend.login === login)) {
          newRelations[login] = 'friends';
        } else if (pendingSent.some((user) => user.login === login)) {
          newRelations[login] = 'pendingSent';
        } else if (pendingReceived.some((user) => user.login === login)) {
          newRelations[login] = 'pendingReceived';
        } else {
          newRelations[login] = 'none';
        }
      });

      setRelations(newRelations);
    } catch (error) {
      console.error("Error fetching relations:", error);
    }
  };

  const handleSendFriendRequest = (login: string) => {
    api.post(`/api/relations/${login}/send`).then(() => {
      setRelations((prev) => ({...prev, [login]: 'pendingSent'}));
      alert.showError({
        title: 'Success',
        message: 'Friend request sent',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleCancelFriendRequest = (login: string) => {
    api.post(`/api/relations/${login}/reject`).then(() => {
      setRelations((prev) => ({...prev, [login]: 'none'}));
      alert.showError({
        title: 'Cancelled',
        message: 'Friend request cancelled',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleAcceptFriendRequest = (login: string) => {
    api.post(`/api/relations/${login}/accept`).then(() => {
      setRelations((prev) => ({...prev, [login]: 'friends'}));
      alert.showError({
        title: 'Accepted',
        message: 'Friend request accepted',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const handleRemoveFriend = (login: string) => {
    api.post(`/api/relations/${login}/delete-friend`).then(() => {
      setRelations((prev) => ({...prev, [login]: 'none'}));
      alert.showError({
        title: 'Removed',
        message: 'Friend removed',
        level: 'INFO',
        timestamp: new Date().toISOString(),
      });
    });
  };

  const renderActionButton = (user: BasicUserInfo) => {
    const status = relations[user.login] || 'none';

    const handleRemove = () => {
      handleRemoveFriend(user.login);
    }

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
  };

  if (!query) {
    return null;
  }

  return (
    <Card w={'100%'} p="lg" withBorder mt="lg">
      <Group justify={'space-between'} mb='md'>
        <Text size="lg" fw={500}>
          Wyniki wyszukiwania:
        </Text>
        {filteredUsers.length > 0 &&
            <Text size="sm" c="dimmed">
              {filteredUsers.length} results
            </Text>
        }
      </Group>
      <Divider mb={'lg'}/>
      <Stack gap="md">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Group justify={'space-between'} key={user.id}>
              <Group mb="sm" gap="sm" onClick={() => navigate(`/profile/@${user.login}`)} style={{cursor: 'pointer'}}>
                <Avatar src={user.profilePicture} size={"lg"} radius="xl"/>
                <div>
                  <Text size="md">{user.name} {user.surname}</Text>
                  <Text size="sm" opacity={0.5}>
                    @{user.login}
                  </Text>
                </div>
              </Group>
              {loggedInUser.user?.login !== user.login && renderActionButton(user)}
            </Group>
          ))
        ) : (
          <Text size="sm" c="dimmed">
            Brak wyników dla "{query}".
          </Text>
        )}
      </Stack>
    </Card>
  );
};
