import { create } from "zustand";

export const useSelfInfoStore = create((set) => ({
  selfInfo: null,
  setSelfInfo: (info) => set({ selfInfo: info }),
  fetchSelfInfo: async () => {
    try {
      // Api call to fetch self info
    } catch (error) {
      console.log("Error fetching self info:", error);
    }
  },
}));
