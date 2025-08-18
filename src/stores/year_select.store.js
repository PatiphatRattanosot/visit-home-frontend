import { create } from "zustand";
import { persist } from "zustand/middleware";

const useYearSelectStore = create(
  persist((set) => ({
    selectedYear: new Date().getFullYear() + 543,
    setSelectedYear: (year) => set({ selectedYear: year }),
  }))
);

export default useYearSelectStore;
