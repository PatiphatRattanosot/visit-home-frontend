import { create } from "zustand";

export const useFamilyStatusStore = create((set) => ({
  familyStatus: null,
  setFamilyStatus: (status) => set({ familyStatus: status }),
  fetchFamilyStatus: async () => {
    try {
      // Api call to fetch family status
    } catch (error) {
      console.log("Error fetching family status:", error);
    }
  },
}));
