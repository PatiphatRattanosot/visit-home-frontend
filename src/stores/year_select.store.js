import { create } from "zustand";
import { persist } from "zustand/middleware";

const useYearSelectStore = create(
  persist((set) => ({
    selectedYear: new Date().getFullYear() + 543, // Convert to Thai Buddhist year
    setSelectedYear: (year) => set({ selectedYear: year }),
  }))
);

export default useYearSelectStore;
