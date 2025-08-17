import { create } from "zustand";

const useYearSelectStore = create((set) => ({
  selectedYear: new Date().getFullYear(),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));

export default useYearSelectStore;
