import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Swal from "sweetalert2";
import StudentService from "../services/student/student.service";

export const useStudentFormStore = create(
  persist(
    (set, get) => ({
      formData: {}, // Start with an empty object

      // To update/merge form data
      setFormData: (data, yearId) =>
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
      name: `student_data_${yearId}`, // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
