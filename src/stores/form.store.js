import { create } from "zustand";
import { persist } from "zustand/middleware";
import Swal from "sweetalert2";
import StudentService from "../services/student/student.service";

export const useStudentFormStore = create(
  persist((set, get) => ({
    formData: {}, // Start with an empty object

    // To update/merge form data
    setFormData: (data, yearId) => {
      // Update formData
      set({
        formData: {
          ...get().formData,
          ...data,
        },
      });
      // Update localStorage key with yearId
      const storeName = `student_data_${yearId}`;
      localStorage.setItem(storeName, JSON.stringify(get().formData));
    },

    // Optional: clear the form data, e.g., on submit
    clearFormData: (yearId) => {
      set({ formData: {} });
      localStorage.removeItem(`student_data_${yearId}`);
    },
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
          get().clearFormData(yearId); // Clear form data after successful submission
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
  }))
);
