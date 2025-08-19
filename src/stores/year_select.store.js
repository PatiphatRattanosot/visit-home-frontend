import { create } from "zustand";
import { persist } from "zustand/middleware";
import YearServices from "../services/years/years.service";

const useYearSelectStore = create(
  persist((set) => ({
    selectedYear: "",
    setSelectedYear: (year) => set({ selectedYear: year }),
    years: [],
    fetchYears: async () => {
      try {
        const res = await YearServices.getYears();
        if (res.status === 200) {
          const sorted = res.data.sort((a, b) => b.year - a.year);
          set({ years: sorted });
        }
      } catch (error) {
        console.log("error fetching years:", error);
      }
    },
  }))
);

export default useYearSelectStore;
