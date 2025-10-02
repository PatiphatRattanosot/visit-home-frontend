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

        console.log("Submitting data:", reqData);
        console.log("Image file:", image);

        // Submit yearly data first
        const res = await StudentService.yearlyData(reqData);
        console.log("Yearly data response:", res);

        if (res.status !== 200) {
          throw new Error("Failed to update yearly data");
        }

        // Update user info including phone
        const updateUserData = {
          first_name: userInfo?.first_name,
          last_name: userInfo?.last_name,
          prefix: userInfo?.prefix,
          user_id: userInfo?.user_id,
          class_id: userInfo?.class_id,
          phone: data?.phone || "", // Ensure phone is included
        };

        console.log("Updating user with:", updateUserData);
        const resUpdateUser = await StudentService.updateStudent(
          userInfo?._id,
          updateUserData
        );
        console.log("Update user response:", resUpdateUser);

        if (resUpdateUser.status !== 200) {
          throw new Error("Failed to update user information");
        }

        // Handle image upload if provided
        let imageSuccess = true;
        if (image && image instanceof File) {
          const updateImageData = new FormData();
          updateImageData.append("file_image", image);
          updateImageData.append("student_id", userInfo?._id);

          console.log("Uploading image:", image.name);
          try {
            const resUpdateImage = await StudentService.updateProfile(
              updateImageData
            );
            console.log("Image upload response:", resUpdateImage);
            imageSuccess = resUpdateImage.status === 200;
          } catch (error) {
            console.error("Image upload error:", error);
            imageSuccess = false;
            // Don't fail the entire process if image upload fails
            await Swal.fire({
              icon: "warning",
              title: "คำเตือน",
              text: "อัพโหลดรูปภาพไม่สำเร็จ แต่ข้อมูลอื่นๆ ถูกบันทึกเรียบร้อยแล้ว",
              confirmButtonText: "ตกลง",
            });
          }
        }

        // Success message
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
        return true;
      } catch (error) {
        console.error("Error submitting form:", error);
        await Swal.fire({
          icon: "error",
          title: "ข้อผิดพลาด",
          text:
            error.message || "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
        return false;
      }
    },
  }))
);
