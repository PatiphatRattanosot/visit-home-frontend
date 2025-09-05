import { create } from "zustand";
import VisitInfoService from "../services/visit-info/visitInfo.service";
import toast from "react-hot-toast";

export const useVisitInfoStore = create((set, get) => ({
  visitInfos: [],
  visitInfo: null,
  setVisitInfos: (visitInfos) => set({ visitInfos }),

  addVisitInfo: async (data) => {
    try {
      const response = await VisitInfoService.addVisitInfo(data);
      if (response.status === 200) {
        toast.success( response.data.message || "เพิ่มข้อมูลการเยี่ยมบ้านเรียบร้อยแล้ว");
        set({ visitInfos: [...get().visitInfos, response.data.visitInfo] });
        return response.data.visitInfo;
      }
    } catch (error) {
      toast.error( error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มข้อมูลการเยี่ยมบ้าน", { duration: 3600 } );
      console.error("Error adding visit info:", error);
    }
  },

  getVisitInfoById: async (id) => {
    try {
      const response = await VisitInfoService.getVisitInfoById(id);
      if (response.status === 200) {
        set({ visitInfo: response.data.visitInfo });
        return response.data.visitInfo;
      }
    } catch (error) {
      console.error("Error fetching visit info by ID:", error);
    }
  },
  getVisitInfoByStudentId: async (studentId, teacherId, yearId) => {
    try {
      const response = await VisitInfoService.getVisitInfoByStudentId(
        studentId,
        teacherId,
        yearId
      );
      if (response.status === 200) {
        return response.data.visitInfo;
      }
    } catch (error) {
      console.error("Error fetching visit info by student ID:", error);
    }
  },
}));
