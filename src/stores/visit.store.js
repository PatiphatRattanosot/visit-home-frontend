import { create } from "zustand";
import VisitInfoService from "../services/visit-info/visitInfo.service";
import toast from "react-hot-toast";

export const useVisitInfoStore = create((set, get) => ({
  visitInfos: [],
  visitInfo: null,
  setVisitInfos: (visitInfos) => set({ visitInfos }),

  addVisitInfo: async (data) => {
    console.log("Adding visit info with data:", data);

    try {
      const response = await VisitInfoService.addVisitInfo(data);
      if (response.status === 201) {
        toast.success(
          response.data.message || "เพิ่มข้อมูลการเยี่ยมบ้านเรียบร้อยแล้ว"
        );
        set({ visitInfos: response.data.data });

        return response.data.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการเพิ่มข้อมูลการเยี่ยมบ้าน",
        { duration: 3600 }
      );
      console.error("Error adding visit info:", error);
    }
  },

  getVisitInfoById: async (id) => {
    try {
      const response = await VisitInfoService.getVisitInfoById(id);
      if (response.status === 200) {
        set({ visitInfo: response.data.data });
        return response.data.data;
      }
    } catch (error) {
      // console.error("Error fetching visit info by ID:", error);
    }
  },
  getVisitInfoByStudentId: async (studentId, yearId) => {
    set({ visitInfo: null }); // เคลียร์ข้อมูลเก่า
    try {
      const response = await VisitInfoService.getVisitInfoByStudentId(
        studentId,
        yearId
      );
      if (response.status === 200) {
        set({ visitInfo: response.data.data });
        return response.data.data;
      }
    } catch (error) {
      // console.error("Error fetching visit info by student ID:", error);
    }
  },

  updateVisitInfo: async (data) => {
    try {
      const response = await VisitInfoService.updateVisitInfo(data);
      if (response.status === 200) {
        toast.success(
          response.data.message || "แก้ไขข้อมูลการเยี่ยมบ้านเรียบร้อยแล้ว"
        );
        set({ visitInfo: response.data.data });
        return response.data.data;
      }
    } catch (error) {
      console.error("Error updating visit info:", error);
    }
  },
}));
