import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import StudentService from "../services/student/student.service";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

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
      submitForm: async (stdId, yearId, data) => {
        try {
          const res = await StudentService.yearlyData(stdId, yearId, data);
          console.log(res);

          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "เพิ่มข้อมูลประจำปีเรียบร้อยแล้ว!",
            });
            get().clearFormData(); // Clear form data after successful submission
          } else {
            Swal.fire({
              icon: "error",
              title: "ข้อผิดพลาด",
              text: "ไม่สามารถเพิ่มข้อมูลประจำปีได้.",
            });
          }
        } catch (error) {
          console.log("Error submitting form:", error);
        }
      },
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
      set({ data: response.data });
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  },
  createStudent: async (studentData) => {
    try {
      const response = await StudentService.createStudent(studentData);
      document.getElementById("add_student_modal").close();
      toast.success(response.data.message || "เพิ่มนักเรียนเรียบร้อยแล้ว", { duration: 3500 });
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
  getYearlyData: async (yearId) => {
    try {
      const response = await StudentService.getYearlyData(yearId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch yearly data:", error);
      return null;
    }
  },
}));
