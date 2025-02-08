import {useEffect, useState} from 'react';
import {Avatar, Group, Indicator, ScrollArea, Stack, Text, Title,} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import {Chat} from './components/Chat';
import {UnselectedChat} from './components/UnselectedChat';
import {DateFormatter} from '../shared/utils';
import {useTranslation} from 'react-i18next';
import {useAuthStore} from '../shared/services/authStore';
import {useWebsocketStore} from '../shared/services/websocketStore';
import api from '../shared/services/api';
import {ChatBasicUserInfo} from './types';
import {InfiniteScroll} from "../shared/components/InfiniteScroll";

export const Messenger = () => {
  const navigate = useNavigate();
  const {conversationId} = useParams();
  const {t} = useTranslation('messenger');
  const [users, setUsers] = useState<ChatBasicUserInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Global auth and WebSocket state
  const loggedUserLogin = useAuthStore((state) => state.user?.login);
  const stompClient = useWebsocketStore((state) => state.client);

  const loadMoreUsers = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await api.get<{
        content: ChatBasicUserInfo[],
        totalPages: number
      }>('/api/chat/users', {
        params: {page: nextPage, size: 10},
      });

      const newUsers = response.data.content.map(user => ({
        ...user,
        status: user.status || 'OFFLINE'
      }));

      setUsers(prev => [...prev, ...newUsers]);
      setHasMore(nextPage < response.data.totalPages);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more users:', error);
    } finally {
      setLoading(false);
    }
  };

  // For any user missing conversationId, call the get-or-create endpoint.
  useEffect(() => {
    if (loggedUserLogin && users.length > 0) {
      const usersMissingConversationId = users.filter((user) => !user.chatroomId);
      if (usersMissingConversationId.length > 0) {
        Promise.all(
          usersMissingConversationId.map((user) =>
            api.get<string>(`/api/chat/messages/${loggedUserLogin}/${user.login}`)
              .then((response) => ({...user, chatroomId: response.data}))
          )
        ).then((updatedUsers) => {
          setUsers((prevUsers) =>
            prevUsers.map((u) => updatedUsers.find((upd) => upd.login === u.login) || u)
          );
        });
      }
    }
  }, [loggedUserLogin, users]);

  // Update status subscription
  useEffect(() => {
    if (stompClient?.connected) {
      const sub = stompClient.subscribe('/topic/public', (message) => {
        const data = JSON.parse(message.body);
        console.log('Status update received:', data);

        setUsers(prevUsers => prevUsers.map(user =>
          user.login === data.login ? {...user, status: data.status} : user
        ));
      });
      return () => sub.unsubscribe();
    }
  }, [stompClient]);

  // Modify users fetch to include status
  useEffect(() => {
    api.get<{
      content: ChatBasicUserInfo[],
      totalPages: number
    }>('/api/chat/users', {
      params: {page: 0, size: 10},
    }).then((response) => {
      const usersFromApi = response.data.content.map(user => ({
        ...user,
        status: user.status || 'OFFLINE'
      }));
      setUsers(usersFromApi);
      setHasMore(0 < response.data.totalPages);
    });
  }, []);

  // Subscribe for chat notifications on "/user/queue/messages".
  useEffect(() => {
    if (stompClient?.connected) {
      const sub = stompClient.subscribe('/user/queue/messages', (message) => {
        const data = JSON.parse(message.body);

        setUsers(prevUsers => {
          const existing = prevUsers.find(u => u.chatroomId === data.chatroomId);
          if (existing) {
            return prevUsers.map(u =>
              u.chatroomId === data.chatroomId
                ? {...u, lastMessage: data.content, lastMessageDate: new Date().toISOString()}
                : u
            );
          }

          // For new conversations, add with temporary status
          return [...prevUsers, {
            chatroomId: data.chatroomId,
            login: data.senderLogin === loggedUserLogin ? data.receiverLogin : data.senderLogin,
            name: '',
            surname: '',
            profilePictureUrl: '',
            nickname: '',
            lastMessage: data.content,
            lastMessageDate: new Date().toISOString(),
            status: 'OFFLINE', // Temporary status
            timestamp: new Date().toISOString(),
          }];
        });
      });

      return () => sub.unsubscribe();
    }
  }, [stompClient, loggedUserLogin]);

  // Helper to determine status indicator color.
  const getStatusColor = (status: string) => {
    if (status === 'ONLINE') return 'green';
    if (status === 'IDLE') return 'yellow';
    return 'gray';
  };

  // Lookup the selected conversation partner.
  const selectedPartner = users.find(
    (user) => user.chatroomId?.toString() === conversationId
  );

  return (
    <Group align={'stretch'} gap={0} wrap={'nowrap'}>
      {/* Left panel: conversation list */}
      <Stack p="lg" maw="25vw" mah="100vh">
        <Group justify="space-between">
          <Title>{t('messenger.title')}</Title>
          {/* TODO: Implement new chat addition */}
          {/*<ActionIcon variant="subtle" color="gray" aria-label="New chat">*/}
          {/*  <IconEdit stroke={1.5}/>*/}
          {/*</ActionIcon>*/}
        </Group>
        {/* TODO: Implement dynamic search*/}
        {/*<TextInput*/}
        {/*  placeholder={t('messenger.searchPlaceholder')}*/}
        {/*  leftSection={<IconSearch/>}*/}
        {/*  radius="md"*/}
        {/*  size="lg"*/}
        {/*/>*/}
        <ScrollArea.Autosize>
          <InfiniteScroll
            loadMore={loadMoreUsers}
            hasMore={hasMore}
            loading={loading}
            translation="messenger"
            hideEndMessage
          >
            {[...users]
              .sort((a, b) =>
                new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
              )
              .map((user) => (
                <Group
                  key={user.chatroomId ?? user.login}
                  p="sm"
                  onClick={() => navigate(`/messages/${user.chatroomId}`)}
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
                    {
                      user.lastMessage &&
                        <Group gap={5}>
                            <Text maw="10vw" truncate="end" size="sm" c="dimmed">
                              {user.lastMessage}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {DateFormatter(user.lastMessageDate)}
                            </Text>
                        </Group>
                    }
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
        <Chat conversationId={conversationId} partner={selectedPartner}/>
      )}
    </Group>
  );
};
