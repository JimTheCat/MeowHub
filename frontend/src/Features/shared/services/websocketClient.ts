// src/websocketClient.ts
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

/**
 * Creates and activates a STOMP client using the given token.
 *
 * @param token - The JWT token used for authorization.
 * @returns A STOMP Client instance.
 */
export const createStompClient = (token: string): Client => {
  const socketUrl = `${import.meta.env.VITE_API_URL}/ws`;

  // Create a new STOMP client using SockJS as the underlying WebSocket provider.
  const stompClient = new Client({
    // When using SockJS, leave brokerURL empty and provide a webSocketFactory instead.
    brokerURL: '',
    webSocketFactory: () => new SockJS(socketUrl),
    // Pass your token in the connection headers.
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    // Enable debug logging (optional)
    debug: (msg: string) => console.log(new Date(), msg),
    // Set the auto-reconnect delay (in milliseconds)
    reconnectDelay: 5000,
  });

  // Handle errors reported by the STOMP broker
  stompClient.onStompError = (frame) => {
    console.error('Broker reported error:', frame.headers['message']);
    console.error('Additional details:', frame.body);
  };

  // Activate the STOMP client (this initiates the connection)
  stompClient.activate();

  return stompClient;
};
