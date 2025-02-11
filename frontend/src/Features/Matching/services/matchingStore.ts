import {create} from "zustand";
import api from "../../shared/services/api.ts";
import {MatchingProfile, MatchingProfilePreferences} from "../types";

type MatchingState = {
  profile: MatchingProfile | null;
  preferences: MatchingProfilePreferences | null;
  isLoading: boolean;
  isPreferencesLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchPreferences: () => Promise<void>;
  updatePreferences: (preferences: MatchingProfilePreferences) => Promise<void>;
};

export const useMatchingStore = create<MatchingState>((set) => ({
  profile: null,
  preferences: null,
  isLoading: false,
  isPreferencesLoading: false,
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

  fetchPreferences: async () => {
    set({isPreferencesLoading: true, error: null});
    try {
      const response = await api.get("/api/matching-profile/preferences");
      set({preferences: response.data, isPreferencesLoading: false});
    } catch (error) {
      set({preferences: null, isPreferencesLoading: false, error: "Failed to fetch preferences"});
    }
  },

  updatePreferences: async (preferences: MatchingProfilePreferences) => {
    set({isPreferencesLoading: true, error: null});
    try {
      await api.post("/api/matching-profile/preferences", preferences);
      const response = await api.get("/api/matching-profile/preferences");
      set({preferences: response.data, isPreferencesLoading: false});
    } catch (error) {
      set({isPreferencesLoading: false, error: "Failed to update preferences"});
    }
  },
}));