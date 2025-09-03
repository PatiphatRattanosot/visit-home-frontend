import { create } from "zustand";
import StudentService from "../services/student/student.service";
import UserService from "../services/users/users.service";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

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
      document.getElementById("add_student_modal").close();
      toast.success(response.data.message || "เพิ่มนักเรียนเรียบร้อยแล้ว", {
        duration: 3500,
      });
      set({ data: get().data.concat(response.data) });
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  },
  updateStudent: async (id, studentData) => {
    try {
      const response = await StudentService.updateStudent(id, studentData);
      console.log("Updated student:", response.data);
      document.getElementById(`edit_student_${id}`).close();
      toast.success(response.data.message || "แก้ไขข้อมูลนักเรียนเรียบร้อยแล้ว", {
        duration: 3500,
      });
      set({
        data: get().data.map((student) =>
          student._id === id ? response.data.student : student
        ),
      });
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  },
  getStudentById: async (id) => {
    try {
      const response = await StudentService.getStudentById(id);
      if (response.status === 200) {
        return response.data.student;
      }
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

  deleteStudent: async (email) => {
  return Swal.fire({
    title: "ยืนยันการลบ",
    text: "คุณต้องการลบข้อมูลนักเรียนนี้ใช่หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await UserService.deleteUser(email);
        await Swal.fire({
          icon: "success",
          title: response.data.message || "ลบข้อมูลนักเรียนเรียบร้อยแล้ว",
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedStudents = get().data.filter(
          (student) => student.email !== email
        );
        set({ data: updatedStudents });
        return true;
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบข้อมูลนักเรียนได้",
        });
        return false;
      }
    } else {
      await Swal.fire({
        icon: "info",
        title: "ยกเลิกการลบ",
        text: "คุณได้ยกเลิกการลบข้อมูลนักเรียน",
      });
      return false;
    }
  });
},
}));
