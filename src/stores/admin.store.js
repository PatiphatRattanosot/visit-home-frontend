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
      //ถ้า Log User จะต้องเป็น response.data.users
      console.log("hello teacher", response.data);
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
      console.log("getPersonnelById = ", response);
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
      console.log(res);

      if (res.status === 201) {
        document.getElementById("add_personnel").close();
        toast.success(res.data.message);
        //concat ใช้สำหรับรวม array ใหม่กับ array ที่มีอยู่
        const newPersonnel = get().data.concat(res.data.teacher); // เพิ่มบุคลากรใหม่เข้าไปในข้อมูลที่มีอยู่
        set({ data: newPersonnel }); // อัปเดตข้อมูล personnel หลังจากเพิ่มสำเร็จ
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("เพิ่มผิดพลาดนะ", error.response.data.message);
    }
  },
  updatePersonnel: async (id, values) => {
<<<<<<< HEAD

    try {
      const res = await UserService.updateTeacher({ ...values, _id: id });
      console.log("res", res);
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
=======
  try {
    const res = await Userservice.updateTeacher({ ...values, _id: id });
   
    if (res.status === 200) {
      document.getElementById(`edit_personnel_${id}`).close();
      toast.success(res.data.message || "แก้ไขข้อมูลเรียบร้อยแล้ว");
      await get().fetchData();
>>>>>>> a9455de (Update personnel status filter and improve error handling in admin store and edit schema limit class room)
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูลบุคลากร"
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
  addAdminRole: async (email) => {
    try {
      const response = await UserService.addAdminRole(email, newRole);

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



<<<<<<< HEAD
=======
      if (response.status === 200) {
        toast.success("แก้ไขปีการศึกษาเรียบร้อยแล้ว");
        get().fetchData(); // เรียกใช้ fetchData เพื่ออัปเดตข้อมูล
        document.getElementById(`Edit_year_${id}`).close();
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขปีการศึกษา"
      );
    }
  },

deleteYear: async (_id) => {
    // ดึงข้อมูลปีจาก store (array data)
    //สร้างตัวแปร yearObj เพื่อค้นหาปีการศึกษาที่ตรงกับ _id ที่ต้องการลบ
    // ใช้ find(year => year._id === _id) เพื่อค้นหา
    //อันนี้ไม่ค่อยเข้าใจ
  const yearName = get().data.find((year) => year._id === _id);
  const year = yearName ? yearName.year : "ไม่ทราบปีการศึกษา";
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: `คุณต้องการลบข้อมูลปีการศึกษา ${year} หรือไม่!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await YearServices.deleteYear(_id);
        if (response.status === 200) {
          Swal.fire({
            title: "ลบข้อมูลเรียบร้อย",
            text: response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            get().fetchData(); // รีเฟรชข้อมูลหลังลบ
          });
        }
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text:
            err.response?.data?.message || "ไม่สามารถลบข้อมูลปีการศึกษาได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.log(err);
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

export const useClassroomStore = create((set, get) => ({
  data: [],
  setData: (data) => set({ data }), // ตั้งค่าเริ่มต้นให้ชั้นเรียน
  fetchData: async (yearId) => {
    try {
      const response = await ClassroomService.getClassroomsByYear(yearId);
      console.log("yearId:", yearId); // ควรขึ้น ObjectId

      if (response.status === 200) {
        set({ data: response.data.classes });
      }
    } catch (error) {
      console.log(error.response.data.message);
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
        set({ data: response.data.classes });

        document.getElementById("add_classroom").close(); // ปิด modal
      }
    } catch (error) {
      console.error(
        "Error in classService.createClass:",
        error.response?.data.message
      );

      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มชั้นเรียน"
      );
    }
  },
  getClassroomById: async (id) => {
    try {
      const response = await ClassroomService.getClassById(id);
      if (response.status === 200) {
        return response.data.class; // ส่งคืนข้อมูลชั้นเรียนที่ได้
      }
    } catch (error) {
      console.error("Error in getClassroomById:", error);
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
        const updatedClassrooms = get().data.map((classroom) =>
          classroom._id === id ? { ...classroom, ...values } : classroom
        );
        set({ data: updatedClassrooms }); // อัปเดตข้อมูลชั้นเรียนหลังจากแก้ไขสำเร็จ
        document.getElementById(`edit_classroom_${id}`).close(); // ปิด modal
      }
    } catch (error) {
      console.error("Error in updateClassroom:", error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขชั้นเรียน"
      );
    }
  },

  deleteClassroom: async (id) =>
    Swal.fire({
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
          Swal.fire({
            title: "ลบข้อมูลเรียบร้อย",
            text: response.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            const updatedClassrooms = get().data.filter(
              (classroom) => classroom._id !== id
            );
            set({ data: updatedClassrooms });
          });
        } catch (err) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text:
              err.response?.data?.message || "ไม่สามารถลบข้อมูลชั้นเรียนได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
          console.log(err);
        }
      } else if (result.isDismissed) {
        Swal.fire({
          title: "ยกเลิกการลบข้อมูล",
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }),
}));
>>>>>>> a9455de (Update personnel status filter and improve error handling in admin store and edit schema limit class room)
