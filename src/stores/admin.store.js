import { create } from "zustand";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UserService from "../services/users/users.service";

export const usePersonnelStore = create((set, get) => ({
  data: [], // state ของข้อมูลเปลี่ยนชื่อได้
  setData: (data) => set({ data }), // js ชื่อตัวแปรตรงกัน
  fetchData: async () => {
    try {
      const response = await UserService.getAllTeacher();
      if (response.status === 200) {
        set({ data: response.data.teachers }); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
        return response.data.teachers; // ส่งคืนข้อมูลบุคลากรที่ได้
      }
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  },
  getPersonnelById: async (id) => {
    try {
      const response = await UserService.getTeacherById(id);

      if (response.status === 200) {
        return response.data.teacher; // ส่งคืนข้อมูลบุคลากรที่ได้
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลบุคลากร"
      );
    }
  },
  addPersonnel: async (values) => {
    try {
      const res = await UserService.addTeacher(values);

      if (res.status === 201) {
        document.getElementById("add_personnel").close();
        toast.success(res.data.message);
        //concat ใช้สำหรับรวม array ใหม่กับ array ที่มีอยู่
        const newPersonnel = get().data.concat(res.data.teacher); // เพิ่มบุคลากรใหม่เข้าไปในข้อมูลที่มีอยู่
        set({ data: newPersonnel }); // อัปเดตข้อมูล personnel หลังจากเพิ่มสำเร็จ
      }
    } catch (error) {
      document.getElementById("add_personnel").close();
      toast.error(error.response.data.message);
      console.log("เพิ่มผิดพลาดนะ", error.response.data.message);
    }
  },
  updatePersonnel: async (id, values) => {
    try {
      const res = await UserService.updateTeacher({ ...values, _id: id });

      if (res.status === 200) {
        document.getElementById(`edit_personnel_${id}`).close();
        toast.success(res.data.message);
        const updatedPersonnel = get().data.map((person) =>
          person._id === id ? { ...person, ...values } : person
        );
        set({ data: updatedPersonnel }); // อัปเดตข้อมูล personnel หลังจากแก้ไขสำเร็จ
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการอัปเดตข้อมูลบุคลากร"
      );
    }
  },

  deletePersonnel: async (email) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบข้อมูลบุคลากรนี้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await UserService.deleteUser(email); // ลบหลังจากผู้ใช้ยืนยันแล้ว
          Swal.fire({
            title: "ลบข้อมูลเรียบร้อย",
            text: response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            const updatedPersonnel = get().data.filter(
              (person) => person.email !== email
            );
            set({ data: updatedPersonnel });
          });
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลบุคลากรได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      } else if (result.isDismissed) {
        Swal.fire({
          title: "ยกเลิกการลบข้อมูล",
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  },
  addAdminRole: async (email, roleToAdd) => {
    try {
      const response = await UserService.addAdminRole(email, roleToAdd);

      if (response.status === 200) {
        toast.success(response.data.message || "บทบาทถูกเปลี่ยนเรียบร้อยแล้ว");
        get().fetchData(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากรใหม่
      }
    } catch (error) {
      console.error(
        "Error changing role:",
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนบทบาท"
      );
      toast.error(
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนบทบาท"
      );
    }
  },
  removeAdminRole: async (email, roleToRemove) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบบทบาท",
        text: `คุณต้องการลบบทบาทของ ${roleToRemove} หรือไม่?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await UserService.removeAdminRole(
            email,
            roleToRemove
          );

          const message = response.data.message || "บทบาทถูกลบเรียบร้อยแล้ว";

          if (response.status === 200) {
            toast.success(message);
            get().fetchData(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากรใหม่
          }
        } else if (result.isDismissed) {
          Swal.fire({
            title: "ยกเลิกการลบบทบาท",
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการลบบทบาท";
      console.error("Error removing role:", error);
      toast.error(errorMessage);
    }
  },
}));
