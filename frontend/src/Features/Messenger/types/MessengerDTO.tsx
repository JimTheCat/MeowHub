export type ChatBasicUserInfo = {
  chatroomId: string;
  login: string;
  name: string;
  surname: string;
  profilePictureUrl: string;
  nickname: string;
  lastMessage: string;
  lastMessageDate: string;
  status: 'ONLINE' | 'IDLE' | 'OFFLINE';
  timestamp: string;
};

export type ChatMessageDto = {
  clientId: string;
  chatroomId: string;
  senderLogin: string | undefined;
  receiverLogin: string;
  content: string;
};