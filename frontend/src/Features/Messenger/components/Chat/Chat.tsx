import {useEffect, useRef, useState} from 'react';
import {Avatar, Card, Flex, Group, Indicator, ScrollArea, Stack, Text, Title, Tooltip,} from '@mantine/core';
import {ChatBasicUserInfo, ChatMessageDto} from '../../types';
import {useWebsocketStore} from '../../../shared/services/websocketStore.ts';
import {useAuthStore} from '../../../shared/services/authStore.ts';
import api from '../../../shared/services/api.ts';
import {DateFormatter} from '../../../shared/utils';
import {MessageSender} from '../MessageSender';
import {v4 as uuidv4} from 'uuid';
import {InfiniteScroll} from '../../../shared/components/InfiniteScroll';
import {Status} from "../../consts";

export type ChatMessage = {
  id: string | number;
  content: string;
  conversationId: string;
  senderLogin: string;
  timestamp: string;
};

type ChatProps = {
  conversationId: string;
  partner?: ChatBasicUserInfo;
};

export const Chat = ({conversationId, partner}: ChatProps) => {
  const [messagePage, setMessagePage] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useWebsocketStore((state) => state.client);
  const loggedUser = useAuthStore((state) => state.user);
  const loggedUserLogin = loggedUser?.login;

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;
    scrollArea.scrollTop = scrollArea.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get<{
          content: ChatMessage[];
          totalPages: number;
        }>(`/api/chat/messages/${conversationId}`, {
          params: {page: 0, size: 50},
        });

        setMessages(response.data.content);
        setHasMoreMessages(0 < response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    if (conversationId) {
      fetchChatHistory();
    }
  }, [conversationId]);

  useEffect(() => {
    if (stompClient && stompClient.connected && loggedUserLogin) {
      const subscription = stompClient.subscribe(
        `/user/${loggedUserLogin}/queue/messages`,
        (message) => {
          const data = JSON.parse(message.body);
          console.log('New message received:', data);

          if (data.chatroomId === conversationId) {
            const newMsg: ChatMessage = {
              id: data.id || Date.now(),
              content: data.content,
              conversationId: data.chatroomId,
              senderLogin: data.senderLogin,
              timestamp: data.timestamp || new Date().toISOString(),
            };

            setMessages((prev) => {
              if (!prev.some((msg) => msg.id === newMsg.id)) {
                return [...prev, newMsg];
              }
              return prev;
            });
          }
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [stompClient, stompClient?.connected, conversationId, loggedUserLogin]);

  const loadMoreMessages = async () => {
    if (!hasMoreMessages || loadingMessages) return;

    const scrollArea = scrollAreaRef.current;
    const scrollTop = scrollArea?.scrollTop ?? 0;
    const scrollHeight = scrollArea?.scrollHeight ?? 0;

    setLoadingMessages(true);
    try {
      const nextPage = messagePage + 1;
      const response = await api.get<{
        content: ChatMessage[];
        totalPages: number;
      }>(`/api/chat/messages/${conversationId}`, {
        params: {page: nextPage, size: 50},
      });

      setMessages((prev) => [...response.data.content, ...prev]);

      if (scrollArea) {
        requestAnimationFrame(() => {
          scrollArea.scrollTop = scrollArea.scrollHeight - scrollHeight + scrollTop;
        });
      }

      setHasMoreMessages(nextPage < response.data.totalPages);
      setMessagePage(nextPage);
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleMessageSent = (msg: ChatMessageDto) => {
    if (!stompClient || !loggedUserLogin) return;

    const clientId = uuidv4();

    const newMsg: ChatMessage = {
      id: clientId,
      content: msg.content,
      conversationId: msg.chatroomId,
      senderLogin: loggedUserLogin,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);

    stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify({
        clientId: clientId,
        chatroomId: msg.chatroomId,
        senderLogin: loggedUserLogin,
        receiverLogin: msg.receiverLogin,
        content: msg.content,
      }),
    });
  };

  return (
    <Flex direction="column" h="100vh" style={{flexGrow: 1}}>
      {/* Chat header */}
      <Card style={{flexShrink: 0}}>
        <Group justify="space-between">
          <Group>
            <Indicator
              size={14}
              offset={7}
              color={partner?.status === 'ONLINE' ? 'teal' : 'gray'}
              position={'bottom-end'}
              withBorder
            >
              <Avatar size="lg" radius="xl" src={partner?.profilePictureUrl}/>
            </Indicator>
            <Stack gap={0}>
              <Title order={4}>
                {partner?.name} {partner?.surname}
              </Title>
              <Text c="dimmed">{Status(partner?.status)}</Text>
            </Stack>
          </Group>
          <Group gap="xs">
            {/* TODO: Add possibility to search through conversation */}
            {/*<ActionIcon color="gray" variant="subtle" radius="xl" size="xl">*/}
            {/*  <IconSearch stroke={1.5} />*/}
            {/*</ActionIcon>*/}
          </Group>
        </Group>
      </Card>

      {/* Wiadomości czatu */}
      <ScrollArea.Autosize p="xs" style={{flexGrow: 1}} viewportRef={scrollAreaRef}>
        <InfiniteScroll
          loadMore={loadMoreMessages}
          hasMore={hasMoreMessages}
          loading={loadingMessages}
          translation={'messenger'}
          hideEndMessage
          rootRef={scrollAreaRef}
        >
          <Stack gap="xs">
            {messages.map((msg, index) => (
              <Group
                key={`${msg.id}-${msg.timestamp}-${index}`}
                justify={msg.senderLogin === loggedUserLogin ? 'flex-end' : 'flex-start'}
              >
                <Tooltip
                  label={DateFormatter(msg.timestamp)}
                  position={msg.senderLogin === loggedUserLogin ? 'bottom-start' : 'bottom-end'}
                  transitionProps={{transition: 'slide-down', duration: 300}}
                  offset={
                    msg.senderLogin === loggedUserLogin
                      ? {mainAxis: -10, crossAxis: -10}
                      : {mainAxis: -10, crossAxis: 10}
                  }
                  openDelay={100}
                  closeDelay={100}
                >
                  <Card radius="lg" shadow="lg">
                    <Text>{msg.content}</Text>
                  </Card>
                </Tooltip>
              </Group>
            ))}
          </Stack>
        </InfiniteScroll>
      </ScrollArea.Autosize>

      {/* Message sender */}
      {loggedUserLogin && partner && (
        <MessageSender
          conversationId={conversationId}
          receiverLogin={partner.login}
          onMessageSent={handleMessageSent}
        />
      )}
    </Flex>
  );
};
