import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import StudentService from "../services/student/student.service";

export const useStudentFormStore = create(
  persist(
    (set, get) => ({
      formData: {}, // Start with an empty object

      // To update/merge form data
      setFormData: (data) =>
        set({
          formData: {
            ...get().formData,
            ...data,
          },
        }),

      // Optional: clear the form data, e.g., on submit
      clearFormData: () => set({ formData: {} }),
    }),
    {
      name: "student-form-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useStudentStore = create((set, get) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  fetchData: async () => {
    try {
      const response = await StudentService.getAllStudents();
      console.log(response);
      
      set({ data: response.data });
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  },
  createStudent: async (studentData) => {
    try {
      const response = await StudentService.createStudent(studentData);
      set({ data: get().data.concat(response.data) });
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  },
  updateStudent: async (id, studentData) => {
    try {
      const response = await StudentService.updateStudent(id, studentData);
      set({
        data: get().data.map((student) =>
          student.id === id ? response.data : student
        ),
      });
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  },
  getStudentById: async (id) => {
    try {
      const response = await StudentService.getStudentById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch student by ID:", error);
      return null;
    }
  },
}));
