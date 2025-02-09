// types.ts
import {ChatBasicUserInfo} from "../types";
import {ChatMessage} from "../components/Chat";
import api from "../../../services/api.ts";
import {useMatchingStore} from "../../../../Matching/services/matchingStore.ts";
import {useAuthStore} from "../../../services/authStore.ts";

export type ChatConfig = {
  endpoints: {
    users: string;
    getOrCreateChatroom: (sender: string, receiver: string) => string;
    messages: (chatroomId: string) => string;
  };
  wsTopics: {
    status: string;
    messages: string;
  };
  transformUsers: (users: any[]) => ChatBasicUserInfo[];
  parseStatusMessage: (body: string) => { login: string; status: 'ONLINE' | 'IDLE' | 'OFFLINE' };
  messageMapper: (message: any) => ChatMessage;
  getCurrentUser: () => Promise<any>;
  baseRoute: string;
  sendMessageDestination: string;
};

export const mainRegularChatConfig: ChatConfig = {
  endpoints: {
    users: '/api/chat/users',
    getOrCreateChatroom: (s, r) => `/api/chat/messages/${s}/${r}`,
    messages: (id) => `/api/chat/messages/${id}`,
  },
  wsTopics: {
    status: '/topic/public',
    messages: '/queue/messages',
  },
  transformUsers: (users) =>
    users.map((user) => ({
      chatroomId: user.chatroomId,
      login: user.login,
      name: user.name,
      surname: user.surname,
      profilePictureUrl: user.profilePictureUrl,
      nickname: user.nickname,
      lastMessage: user.lastMessage || '',
      lastMessageDate: user.lastMessageDate || new Date().toISOString(),
      status: user.status || 'OFFLINE',
      timestamp: user.timestamp || new Date().toISOString(),
    })),
  parseStatusMessage: (body) => JSON.parse(body),
  messageMapper: (msg) => ({
    id: msg.id,
    content: msg.content,
    conversationId: msg.chatroomId,
    senderLogin: msg.senderLogin,
    timestamp: msg.timestamp,
  }),
  // Regular chat config snippet:
  getCurrentUser: async () => {
    const user = useAuthStore.getState().user;
    // Fallback to user.id if login is missing.
    const login = user?.login;
    if (!login) {
      return {
        login: '',
        name: '',
        surname: '',
        profilePictureUrl: '',
        status: 'OFFLINE',
      };
    }
    try {
      const response = await api.get<ChatBasicUserInfo>('/api/users/basic-user-info', {
        params: {login},
      });
      return {
        login: response.data.login, // make sure response.data.login is the proper unique identifier
        name: response.data.name,
        surname: response.data.surname,
        profilePictureUrl: response.data.profilePictureUrl,
        status: 'OFFLINE',
      };
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      return {
        login,
        name: '',
        surname: '',
        profilePictureUrl: '',
        status: 'OFFLINE',
      };
    }
  },

  baseRoute: '/messages',
  sendMessageDestination: '/app/chat',
};

export const mainMatchingChatConfig: ChatConfig = {
  endpoints: {
    users: '/api/matching-chat/users',
    getOrCreateChatroom: (_s, r) => `/api/matching-chat/chatroom/${r}`,
    messages: (id) => `/api/matching-chat/messages/${id}`,
  },
  wsTopics: {
    status: '/topic/matching/public', // Ensure this is the correct topic.
    messages: '/matching/queue/messages',
  },
  transformUsers: (users) =>
    users.map((user) => ({
      chatroomId: user.matchingChatId,
      login: user.id,
      name: user.name,
      surname: '', // if not available
      profilePictureUrl: user.pictureUrl,
      nickname: '',
      lastMessage: user.lastMessage || '',
      lastMessageDate: user.lastMessageDate || new Date().toISOString(),
      status: user.connectStatus || 'OFFLINE', // Ensure this maps correctly
      timestamp: user.timestamp || new Date().toISOString(),
    })),
  // IMPORTANT: Adjust parsing to match the backend’s status message format.
  parseStatusMessage: (body) => {
    const data = JSON.parse(body);
    // For example, if the message has { id: 'userId', status: 'ONLINE' }
    return {login: data.id, status: data.status};
  },
  messageMapper: (msg) => ({
    id: msg.matchingChatMessageId,
    content: msg.content,
    conversationId: msg.matchingChatId,
    senderLogin: msg.senderId,
    timestamp: msg.timestamp,
  }),
  getCurrentUser: async () => {
    const profile = useMatchingStore.getState().profile;
    if (!profile || !profile.id) {
      return {
        login: '',
        name: '',
        surname: '',
        profilePictureUrl: '',
        status: 'OFFLINE',
      };
    }
    return {
      login: profile.id,
      name: profile.name,
      surname: '',
      profilePictureUrl: profile.pictures[0] || '',
      status: 'ONLINE',
    };
  },
  baseRoute: '/matching/messages',
  sendMessageDestination: '/app/matching-chat',
};
