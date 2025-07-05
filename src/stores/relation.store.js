import { create } from "zustand";

export const useRelationStore = create((set) => ({
  relationInfo: null,
  setRelationInfo: (info) => set({ relationInfo: info }),
  fetchRelationInfo: async () => {
    try {
      // Api call to fetch relation info
    } catch (error) {
      console.log("Error fetching relation info:", error);
    }
  },
}));
