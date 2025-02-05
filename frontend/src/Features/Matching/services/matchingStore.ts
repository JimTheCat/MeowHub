import {create} from "zustand";
import api from "../../shared/services/api.ts";
import {MatchingProfile} from "../types";

type MatchingState = {
  profile: MatchingProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
};

export const useMatchingStore = create<MatchingState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    set({isLoading: true, error: null});

    try {
      const response = await api.get("/api/matching-profile/own");
      set({profile: response.data, isLoading: false});
    } catch (error) {
      set({profile: null, isLoading: false, error: "Failed to fetch profile"});
    }
  },
}));
