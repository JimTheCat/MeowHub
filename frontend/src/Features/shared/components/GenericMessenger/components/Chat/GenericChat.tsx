import {useEffect, useRef, useState} from 'react';
import {Avatar, Card, Flex, Group, Indicator, ScrollArea, Stack, Text, Title, Tooltip,} from '@mantine/core';
import {MessageSender} from '../MessageSender';
import {ChatBasicUserInfo, ChatMessageDto} from '../../types';
import {useWebsocketStore} from '../../../../services/websocketStore';
import api from '../../../../services/api';
import {InfiniteScroll} from '../../../InfiniteScroll';
import {DateFormatter} from '../../../../utils';
import {ChatConfig, Status} from '../../consts';
import {v4 as uuidv4} from 'uuid';

export type ChatMessage = {
  id: string | number;
  content: string;
  conversationId: string;
  senderLogin: string;
  timestamp: string;
};

type GenericChatProps = {
  conversationId: string;
  partner?: ChatBasicUserInfo;
  config: ChatConfig;
};

export const GenericChat = ({conversationId, partner, config}: GenericChatProps) => {
  const [messagePage, setMessagePage] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useWebsocketStore((state) => state.client);

  // Helper: sorts an array of messages by ascending timestamp.
  const sortMessages = (msgs: ChatMessage[]): ChatMessage[] => {
    return msgs.slice().sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };

  // Retrieve current user via config for both regular and matching chats.
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    config.getCurrentUser().then(setCurrentUser);
  }, [config]);
  const loggedUserLogin = currentUser?.login;

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when new messages arrive.
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;
    scrollArea.scrollTop = scrollArea.scrollHeight;
  }, [messages.length]);

  // Load chat history.
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get<{ content: any[]; totalPages: number }>(
          config.endpoints.messages(conversationId),
          {params: {page: 0, size: 50}}
        );
        const mappedMessages = response.data.content.map(config.messageMapper);
        // Ensure messages are sorted ascending (oldest first)
        setMessages(sortMessages(mappedMessages));
        setHasMoreMessages(0 < response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    if (conversationId) {
      fetchChatHistory();
    }
  }, [conversationId, config]);

  useEffect(() => {
    if (stompClient && stompClient.connected && loggedUserLogin) {
      const topic = `/user/${loggedUserLogin}${config.wsTopics.messages}`;

      const subscription = stompClient.subscribe(topic, (message) => {
        const data = JSON.parse(message.body);
        console.log('[WS] Received:', data);

        const conversationIdFromMsg = data.chatroomId || data.matchingChatId;
        if (conversationIdFromMsg !== conversationId) return;

        console.log('[WS] Message belongs to current conversation:', conversationIdFromMsg);

        const messageId = data.id
          || data.matchingChatMessageId
          || data.clientId
          || uuidv4();

        const newMsg: ChatMessage = {
          id: messageId,
          content: data.content,
          conversationId: conversationIdFromMsg,
          senderLogin: data.senderLogin || data.senderId,
          timestamp: data.timestamp || new Date().toISOString(),
        };

        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === newMsg.id);
          return exists ? prev : sortMessages([...prev, newMsg]);
        });
      });

      return () => {
        console.log('[WS] Unsubscribing from:', topic);
        subscription.unsubscribe();
      };
    }
  }, [stompClient, conversationId, loggedUserLogin, config]);


  // Load older messages.
  const loadMoreMessages = async () => {
    if (!hasMoreMessages || loadingMessages) return;
    const scrollArea = scrollAreaRef.current;
    const scrollTop = scrollArea?.scrollTop ?? 0;
    const scrollHeight = scrollArea?.scrollHeight ?? 0;
    setLoadingMessages(true);
    try {
      const nextPage = messagePage + 1;
      const response = await api.get<{ content: any[]; totalPages: number }>(
        config.endpoints.messages(conversationId),
        {params: {page: nextPage, size: 50}}
      );
      const mappedMessages = response.data.content.map(config.messageMapper);
      // Prepend the older messages and re-sort the entire list.
      setMessages((prev) => sortMessages([...mappedMessages, ...prev]));
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

  // Function to send a message.
  const handleMessageSent = (msg: ChatMessageDto) => {
    if (!stompClient || !loggedUserLogin) return;

    const clientId = uuidv4();

    const tempMsg: ChatMessage = {
      id: clientId,
      content: msg.content,
      conversationId: conversationId,
      senderLogin: loggedUserLogin,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => sortMessages([...prev, tempMsg]));

    const payload = config.baseRoute.includes('matching')
      ? {
        matchingChatId: conversationId,
        senderId: loggedUserLogin,
        receiverId: partner?.login,
        content: msg.content,
        clientId: clientId
      }
      : {
        chatroomId: conversationId,
        senderLogin: loggedUserLogin,
        receiverLogin: partner?.login,
        content: msg.content,
        clientId: clientId
      };

    stompClient.publish({
      destination: config.sendMessageDestination,
      body: JSON.stringify(payload),
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
              position="bottom-end"
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

      {/* Message list */}
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

      {/* Message sender component */}
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

