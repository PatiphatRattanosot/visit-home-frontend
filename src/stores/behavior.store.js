import { create } from "zustand";

export const useBehaviorStore = create((set) => ({
  behaviorInfo: null,
  setBehaviorInfo: (info) => set({ behaviorInfo: info }),
  fetchBehaviorInfo: async () => {
    try {
      // Api call to fetch behavior info
    } catch (error) {
      console.log("Error fetching behavior info:", error);
    }
  },
}));
