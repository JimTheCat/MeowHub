import {create} from 'zustand';
import {Client} from '@stomp/stompjs';
import {createStompClient} from "./websocketClient.ts";

type WebsocketState = {
  client: Client | null;
  connect: (token: string) => Promise<void>;
  disconnect: () => Promise<void>;
};

export const useWebsocketStore = create<WebsocketState>((set, get) => ({
  client: null,
  connect: async (token: string) => {
    const client = createStompClient(token);
    set({client});

    return new Promise<void>((resolve) => {
      client.onConnect = () => {
        console.log('WebSocket connected');
        resolve();
      };

      client.activate();
    });
  },
  disconnect: async () => {
    const {client} = get();
    if (client) {
      return new Promise<void>((resolve) => {
        client.onDisconnect = () => {
          console.log('WebSocket disconnected');
          set({client: null});
          resolve();
        };

        client.deactivate();
      });
    }
    return Promise.resolve();
  },
}));
