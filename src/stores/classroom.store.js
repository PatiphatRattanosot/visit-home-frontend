import { create } from "zustand";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ClassroomService from "../services/class/class.service";

export const useClassroomStore = create((set, get) => ({
  classrooms: [],
  classroom: null,
  setClassrooms: (classrooms) => set({ classrooms }), // ตั้งค่าเริ่มต้นให้ชั้นเรียน
  //ทำ fetchClassroom
  fetchClassrooms: async (yearId) => {
    try {
      const response = await ClassroomService.getClassroomsByYear(yearId);
      if (response.status === 200) {
        set({ classrooms: response.data.classes });
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        //ปีนี้ยังไม่มีชั้นเรียน ให้ลิสต์ว่าง
        set({ classrooms: [] });
      }
      console.error("Error fetching classrooms:", error);
    }
  },

  addClassroom: async (values, yearId) => {
    try {
      const response = await ClassroomService.createClass({
        room: values.room,
        number: values.number,
        teacher_id: values.teacherId,
        year_id: yearId, // ส่ง year_id เพื่อระบุปีการศึกษา
      });

      if (response.status === 201) {
        toast.success(response.data.message || "เพิ่มชั้นเรียนสำเร็จ");
        // set({ classrooms: response.data.classes });

        document.getElementById("add_classroom").close(); // ปิด modal
      }
    } catch (error) {
      console.error(
        "Error in classService.createClass:",
        error.response?.data.message
      );
      document.getElementById("add_classroom").close(),
        toast.error(
          error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มชั้นเรียน",
          {
            duration: 2500,
          }
        );
    }
  },
  getClassroomById: async (id) => {
    try {
      const response = await ClassroomService.getClassById(id);
      if (response.status === 200) {
        if (!response.data.class) {
          set({ classroom: null });
          return null;
        }
        set({ classroom: response.data.class }); // ส่งคืนข้อมูลชั้นเรียนที่ได้
        return response.data.class; // ส่งคืนข้อมูลชั้นเรียนที่ได้
      }
    } catch (error) {
      console.error("Error in getClassroomById:", error);
    }
  },
  getClassroomByTeacherId: async (teacherId, yearId) => {
    try {
      const response = await ClassroomService.getClassesByTeacherId(
        teacherId,
        yearId
      );
      // response.data.classes คือ array ห้องเรียน
      set({ classroom: response.data.classes || [] });
      return response.data.classes || [];
    } catch (error) {
      console.error("Error in getClassroomByTeacherId:", error);

      return [];
    }
  },
  updateClassroom: async (id, values) => {
    try {
      const response = await ClassroomService.updateClass({
        class_id: id,
        room: parseInt(values.room),
        number: parseInt(values.number),
        teacher_id: values.teacherId,
      });
      if (response.status === 200) {
        toast.success(response.data.message || "แก้ไขชั้นเรียนสำเร็จ");
        // updateClassroom ใน store
        const updatedClassrooms = get().classrooms.map((classroom) =>
          classroom._id === id ? { ...classroom, ...values } : classroom
        );
        set({ classrooms: updatedClassrooms }); // อัปเดตข้อมูลชั้นเรียนหลังจากแก้ไขสำเร็จ
        document.getElementById(`edit_classroom_${id}`).close(); // ปิด modal
      }
    } catch (error) {
      console.error("Error in updateClassroom:", error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขชั้นเรียน"
      );
    }
  },

  deleteClassroom: async (id) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบข้อมูลชั้นเรียนนี้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await ClassroomService.deleteClass(id);
          if (response.status === 200) {
            toast.success(response.data.message || "ลบชั้นเรียนสำเร็จ");
            // อัปเดตรายการใน store
            const updatedClassrooms = get().classrooms.filter(
              (classroom) => classroom._id !== id
            );
            set({ classrooms: updatedClassrooms });
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message || "เกิดข้อผิดพลาดในการลบชั้นเรียน"
          );
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
}));
