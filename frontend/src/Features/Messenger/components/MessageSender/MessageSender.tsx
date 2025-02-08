import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';
import {TextInput} from '@mantine/core';
import {useWebsocketStore} from "../../../shared/services/websocketStore.ts";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {ChatMessageDto} from "../../types";
import {useTranslation} from "react-i18next";

type MessageSenderProps = {
  conversationId: string;
  receiverLogin: string;
  onMessageSent: (msg: ChatMessageDto) => void;
};

export const MessageSender = ({conversationId, receiverLogin, onMessageSent}: MessageSenderProps) => {
  const [text, setText] = useState('');
  const stompClient = useWebsocketStore((state) => state.client);
  const loggedUser = useAuthStore((state) => state.user);
  const loggedUserLogin = loggedUser?.login;
  const {t} = useTranslation('messenger');

  const sendMessage = () => {
    if (!text.trim() || !stompClient || !loggedUserLogin) return;

    const clientId = uuidv4(); // Generate a unique ID for optimistic updates
    const messagePayload = {
      chatroomId: conversationId,
      senderLogin: loggedUserLogin,
      receiverLogin,
      content: text.trim(),
      clientId, // Include clientId for optimistic updates
    };

    console.log('Sending message:', messagePayload);

    // Optimistically update the chat view
    onMessageSent({
      ...messagePayload,
      clientId: clientId, // Use clientId as temporary ID
    });

    setText('');
  };

  return (
    <TextInput
      placeholder={t('messageSender.placeholder')}
      radius="xl"
      m="md"
      size="xl"
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      }}
    />
  );
};
