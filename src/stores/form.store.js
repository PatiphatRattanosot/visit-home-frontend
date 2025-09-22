import { create } from "zustand";
import { persist } from "zustand/middleware";
import Swal from "sweetalert2";
import StudentService from "../services/student/student.service";

export const useStudentFormStore = create(
  persist((set, get) => ({
    formData: {}, // Start with an empty object

    // To update/merge form data
    setFormData: (data, yearId) => {
      set({
        formData: {
          ...get().formData,
          ...data,
        },
      });
      const storeName = `student_data_${yearId}`;
      localStorage.setItem(storeName, JSON.stringify(get().formData));
    },

    clearFormData: (yearId) => {
      set({ formData: {} });
      localStorage.removeItem(`student_data_${yearId}`);
    },

    submitForm: async (userInfo, yearId, data, image, operation) => {
      try {
        const reqData = {
          ...data,
          student_id: userInfo?._id,
          year_id: yearId,
        };

        const res = await StudentService.yearlyData(reqData);
        const resUpdateUser = await StudentService.updateStudent(
          userInfo?._id,
          {
            first_name: userInfo?.first_name,
            last_name: userInfo?.last_name,
            prefix: userInfo?.prefix,
            user_id: userInfo?.user_id,
            class_id: userInfo?.class_id,
            phone: reqData?.phone,
          }
        );

        let imageSuccess = true;
        if (image && typeof image !== "string") {
          const updateImageData = new FormData();
          updateImageData.append("file_image", image);
          updateImageData.append("student_id", userInfo?._id);
          try {
            const resUpdateImage = await StudentService.updateProfile(
              updateImageData
            );
            imageSuccess = resUpdateImage.status === 200;
          } catch (error) {
            imageSuccess = false;
            console.log(error);
          }
        }

        if (
          res.status === 200 &&
          resUpdateUser.status === 200 &&
          imageSuccess
        ) {
          // Ensure SweetAlert is called after all async operations
          await Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text:
              operation === "add"
                ? "เพิ่มข้อมูลรายปีสำเร็จ!"
                : "แก้ไขข้อมูลรายปีสำเร็จ!",
            showConfirmButton: false,
            timer: 1500,
          });
          get().clearFormData(yearId);
        } else {
          await Swal.fire({
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
