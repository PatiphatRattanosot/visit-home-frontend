import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import YearServices from "../services/years/years.service";
const useYearSelectStore = create(
  persist((set) => ({
    selectedYear: null,
    years: [],
    setSelectedYear: (year) => set({ selectedYear: year }),

    setData: (data) => set({ data }), // ตั้งค่าเริ่มต้นให้ปีการศึกษา
    fetchYears: async () => {
      try {
        const res = await YearServices.getYears();
        
        if (res.status === 200) {
          const sorted = res.data.sort((a, b) => b.year - a.year);
          set({ years: sorted });
         
        }
      } catch (error) {
        console.log("error fetching years:", error);
      }
    },
    addYear: async (values) => {
      try {
        const res = await YearServices.createYear({
          year: Number(values.year),
        });
        if (res.status === 201) {
          toast.success(res.data.message);
          get().fetchData(); // เรียกใช้ fetchData เพื่ออัปเดตข้อมูล
          document.getElementById("add_year").close(); // ปิด modal
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มปีการศึกษา"
        );
      }
    },
    getYearsByYear: async (year) => {
      try {
        const response = await YearServices.getYearsByYear(year);
        if (response.status === 200) {
          const year = response.data.year;
          set({ yearData: year }); // บันทึกลงใน Store
          return year; // คืนค่าเพื่อให้ใช้ใน Component หรือ Formik ได้
        }
        console.log(year);
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดปีการศึกษา"
        );
        return null;
      }
    },
    updateYear: async (id, values) => {
      try {
        //ก้อน object ที่จะส่งไป
        const response = await YearServices.updateYear({
          year_id: id,

          // Number() เป็นฟังก์ชั่นที่เอาไว้เปลี่ยน type ของข้อมูลเป็น integer หรือ ตัวเลข
          new_year: Number(values.year),
        });

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
      Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบข้อมูลปีการศึกษานี้!",
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
                get().fetchData(); // เรียกใช้ fetchData เพื่ออัปเดตข้อมูล
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
  }))
);

export default useYearSelectStore;
