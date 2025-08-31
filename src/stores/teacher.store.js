import { create } from "zustand";
import TeacherService from "../services/teacher/teacher.service";

export const useTeacherStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
  fetchData: async () => {
    try {
      const response = await TeacherService.getAllStudentInclass();
      if (response.status === 200) set({ data: response.data });
    } catch (error) {
      console.log("fetchData error:", error);
    }
  },
}));
