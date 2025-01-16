import {create} from 'zustand';
import api from "./api.ts";

type RelationStatus = 'none' | 'friends' | 'pendingSent' | 'pendingReceived';

interface RelationsState {
  relations: Record<string, RelationStatus>;
  isLoading: boolean;
  error: string | null;

  initializeRelations: () => Promise<void>;
  sendFriendRequest: (login: string) => Promise<void>;
  cancelFriendRequest: (login: string) => Promise<void>;
  acceptFriendRequest: (login: string) => Promise<void>;
  removeFriend: (login: string) => Promise<void>;
}

const fetchPaginatedResults = async (url: string) => {
  const results: any[] = [];
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

export const useRelationsStore = create<RelationsState>((set) => ({
  relations: {},
  isLoading: false,
  error: null,

  initializeRelations: async () => {
    set({isLoading: true, error: null});

    try {
      const [friends, pendingSent, pendingReceived] = await Promise.all([
        fetchPaginatedResults('/api/relations/friends'),
        fetchPaginatedResults('/api/relations/pending'),
        fetchPaginatedResults('/api/relations/received'),
      ]);

      const allRelations: Record<string, RelationStatus> = {};

      friends.forEach(({login}: { login: string }) => {
        allRelations[login] = 'friends';
      });
      pendingSent.forEach(({login}: { login: string }) => {
        allRelations[login] = 'pendingSent';
      });
      pendingReceived.forEach(({login}: { login: string }) => {
        allRelations[login] = 'pendingReceived';
      });

      set({relations: allRelations, isLoading: false});
    } catch (error) {
      console.error('Error initializing relations:', error);
      set({isLoading: false, error: 'Failed to load relations'});
    }
  },

  sendFriendRequest: async (login) => {
    try {
      await api.post(`/api/relations/${login}/send`);
      set((state) => ({
        relations: {...state.relations, [login]: 'pendingSent'},
      }));
    } catch (error) {
      console.error(`Error sending friend request to ${login}:`, error);
    }
  },

  cancelFriendRequest: async (login) => {
    try {
      await api.post(`/api/relations/${login}/reject`);
      set((state) => ({
        relations: {...state.relations, [login]: 'none'},
      }));
    } catch (error) {
      console.error(`Error cancelling friend request for ${login}:`, error);
    }
  },

  acceptFriendRequest: async (login) => {
    try {
      await api.post(`/api/relations/${login}/accept`);
      set((state) => ({
        relations: {...state.relations, [login]: 'friends'},
      }));
    } catch (error) {
      console.error(`Error accepting friend request from ${login}:`, error);
    }
  },

  removeFriend: async (login) => {
    try {
      await api.post(`/api/relations/${login}/delete-friend`);
      set((state) => ({
        relations: {...state.relations, [login]: 'none'},
      }));
    } catch (error) {
      console.error(`Error removing friend ${login}:`, error);
    }
  },
}));
