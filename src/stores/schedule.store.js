import { create } from "zustand";
import toast from "react-hot-toast";
import ScheduleServices from "../services/schedule/schedule.service";

export const useScheduleStore = create((set, get) => ({
  schedule: null,
  setSchedule: (newData) => set({ schedule: newData }),
  fetchSchedule: async (yearId, studentId) => {
    set({ schedule: null });
    try {
      const response = await ScheduleServices.getSchedule(yearId, studentId);

      if (response.status === 200) {
        set({ schedule: response.data.schedules || null });
        return response.data.schedules || null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createSchedule: async (data) => {
    try {
      const response = await ScheduleServices.createSchedule(data);
      if (response.status === 201) {
        // คำสั่ง concat เอา data ใหม่ ไปต่อท้าย array เดิม (หมายถึง Schedule ตัวเดิมที่มีอยู่)

        set({ schedule: response.data.schedule || null });

        toast.success(
          response.data.message || "สร้างเวลานัดหมายเรียบร้อยแล้ว",
          { duration: 3600 }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างตารางนัดหมาย",
        { duration: 3600 }
      );
      return null;
    }
  },
  updateSchedule: async (data) => {
    try {
      const response = await ScheduleServices.updateSchedule(data);
      if (response.status === 200) {
        set({
          schedule: response.data.schedules || [],
        });
        toast.success(
          response.data.message || "อัปเดตเวลานัดหมายเรียบร้อยแล้ว",
          { duration: 3600 }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการอัปเดตตารางนัดหมาย",
        { duration: 3600 }
      );
      return null;
    }
  },
  deleteSchedule: async (id) => {
    try {
      const response = await ScheduleServices.deleteSchedule(id);

      if (response.status === 200) {
        toast.success(response.data.message || "ลบเวลานัดหมายเรียบร้อยแล้ว", {
          duration: 3600,
        });
      }
    } catch (error) {
      console.error("Error in deleteSchedule:", error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการลบเวลานัดหมาย",
        { duration: 3600 }
      );
    }
  },
}));
