// GenericMessenger.tsx
import {useEffect, useState} from 'react';
import {Avatar, Group, Indicator, ScrollArea, Stack, Text, Title,} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import {GenericChat} from './components/Chat';
import {ChatBasicUserInfo} from './types';
import {UnselectedChat} from './components/UnselectedChat';
import {useTranslation} from 'react-i18next';
import {useWebsocketStore} from '../../services/websocketStore';
import api from '../../services/api';
import {InfiniteScroll} from '../InfiniteScroll';
import {DateFormatter} from '../../utils';
import {ChatConfig} from './consts';

type GenericMessengerProps = {
  config: ChatConfig;
};

export const GenericMessenger = ({config}: GenericMessengerProps) => {
  const navigate = useNavigate();
  const {conversationId} = useParams();
  const {t} = useTranslation('messenger');
  const [users, setUsers] = useState<ChatBasicUserInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Global WebSocket state.
  const stompClient = useWebsocketStore((state) => state.client);

  // Load current user using the config (the API-specific logic is inside the config)
  useEffect(() => {
    config.getCurrentUser().then(setCurrentUser);
  }, [config]);

  const loggedUserLogin = currentUser?.login;

  // Load a page of users.
  const loadMoreUsers = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await api.get<{
        content: any[];
        totalPages: number;
      }>(config.endpoints.users, {params: {page: nextPage, size: 10}});

      const newUsers = config.transformUsers(response.data.content);
      setUsers((prev) => [...prev, ...newUsers]);
      setHasMore(nextPage < response.data.totalPages);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more users:', error);
    } finally {
      setLoading(false);
    }
  };

  // For any user missing a conversation ID, call the get-or-create endpoint.
  useEffect(() => {
    if (loggedUserLogin && users.length > 0) {
      const usersMissingConversationId = users.filter((user) => !user.chatroomId);
      if (usersMissingConversationId.length > 0) {
        Promise.all(
          usersMissingConversationId.map((user) =>
            api
              .get<string>(config.endpoints.getOrCreateChatroom(loggedUserLogin, user.login))
              .then((response) => ({...user, chatroomId: response.data}))
          )
        ).then((updatedUsers) => {
          setUsers((prevUsers) =>
            prevUsers.map((u) => updatedUsers.find((upd) => upd.login === u.login) || u)
          );
        });
      }
    }
  }, [loggedUserLogin, users, config]);

  // Subscribe for status updates.
  useEffect(() => {
    if (stompClient?.connected) {
      const sub = stompClient.subscribe(config.wsTopics.status, (message) => {
        const data = config.parseStatusMessage(message.body);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.login === data.login ? {...user, status: data.status} : user
          )
        );
      });
      return () => sub.unsubscribe();
    }
  }, [stompClient, config]);

  // Initial load of users.
  useEffect(() => {
    api.get<{ content: any[]; totalPages: number }>(config.endpoints.users, {
      params: {page: 0, size: 10},
    }).then((response) => {
      const usersFromApi = config.transformUsers(response.data.content);
      setUsers(usersFromApi);
      setHasMore(0 < response.data.totalPages);
    });
  }, [config]);

  // Subscribe for chat notifications.
  useEffect(() => {
    if (stompClient?.connected) {
      const sub = stompClient.subscribe(config.wsTopics.messages, (message) => {
        const data = JSON.parse(message.body);
        setUsers((prevUsers) => {
          const existing = prevUsers.find((u) => u.chatroomId === data.chatroomId);
          if (existing) {
            return prevUsers.map((u) =>
              u.chatroomId === data.chatroomId
                ? {
                  ...u,
                  lastMessage: data.content,
                  lastMessageDate: new Date().toISOString(),
                }
                : u
            );
          }
          // For new conversations, add with temporary default values.
          return [
            ...prevUsers,
            {
              chatroomId: data.chatroomId,
              login:
                data.senderLogin === loggedUserLogin
                  ? data.receiverLogin
                  : data.senderLogin,
              name: '',
              surname: '',
              profilePictureUrl: '',
              nickname: '',
              lastMessage: data.content,
              lastMessageDate: new Date().toISOString(),
              status: 'OFFLINE',
              timestamp: new Date().toISOString(),
            },
          ];
        });
      });
      return () => sub.unsubscribe();
    }
  }, [stompClient, loggedUserLogin, config]);

  // Helper to determine the status indicator color.
  const getStatusColor = (status: string) => {
    if (status === 'ONLINE') return 'green';
    if (status === 'IDLE') return 'yellow';
    return 'gray';
  };

  // Find the partner for the selected conversation.
  const selectedPartner = users.find(
    (user) => user.chatroomId?.toString() === conversationId
  );

  return (
    <Group align="stretch" gap={0} wrap="nowrap">
      {/* Left panel: conversation list */}
      <Stack p="lg" maw="25vw" mah="100vh">
        <Group justify="space-between">
          <Title>{t('messenger.title')}</Title>
          {/* Optionally add a “new chat” button here */}
        </Group>
        <ScrollArea.Autosize>
          <InfiniteScroll
            loadMore={loadMoreUsers}
            hasMore={hasMore}
            loading={loading}
            translation="messenger"
            hideEndMessage
          >
            {[...users]
              .sort(
                (a, b) =>
                  new Date(b.lastMessageDate).getTime() -
                  new Date(a.lastMessageDate).getTime()
              )
              .map((user) => (
                <Group
                  key={user.chatroomId ?? user.login}
                  p="sm"
                  onClick={() => navigate(`${config.baseRoute}/${user.chatroomId}`)}
                  style={(theme) => ({
                    cursor: 'pointer',
                    backgroundColor:
                      conversationId === user.chatroomId?.toString()
                        ? theme.colors.dark[6]
                        : 'transparent',
                  })}
                  wrap="nowrap"
                >
                  <Indicator
                    position="bottom-end"
                    size={14}
                    offset={7}
                    withBorder
                    color={getStatusColor(user.status)}
                  >
                    <Avatar radius={180} size="lg" src={user.profilePictureUrl}/>
                  </Indicator>
                  <Stack gap={0}>
                    <Text>
                      {user.name} {user.surname}
                    </Text>
                    {user.lastMessage && (
                      <Group gap={5}>
                        <Text maw="10vw" truncate="end" size="sm" c="dimmed">
                          {user.lastMessage}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {DateFormatter(user.lastMessageDate)}
                        </Text>
                      </Group>
                    )}
                  </Stack>
                </Group>
              ))}
          </InfiniteScroll>
        </ScrollArea.Autosize>
      </Stack>
      {/* Right panel: chat window */}
      {!conversationId ? (
        <UnselectedChat/>
      ) : (
        <GenericChat
          config={config}
          conversationId={conversationId}
          partner={selectedPartner}
        />
      )}
    </Group>
  );
};
