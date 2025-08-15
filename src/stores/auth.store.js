import { create } from "zustand";
import { persist } from "zustand/middleware";
import Swal from "sweetalert2";
import {
  googleSignIn,
  logout,
  listenToAuthChanges,
} from "../configs/firebase.config";
import AuthServices from "../services/auth.service";

export const useAuthStore = create(
  persist(
    (set) => {
      // Listen to auth state changes
      listenToAuthChanges(async (user) => {
        set({ user, isLoading: false });
        if (!user) {
          set({ userInfo: null });
        } else {
          // Fetch userInfo when logged in
          try {
            const res = await AuthServices.sign({ email: user.email });
            if (res.status === 200) {
              set({ userInfo: res.data?.user });
            } else {
              set({ userInfo: null });
            }
          } catch {
            set({ userInfo: null });
          }
        }
      });

      return {
        user: null,
        userInfo: null,
        isLoading: false,
        signInSystem: async () => {
          try {
            set({ isLoading: true });
            const result = await googleSignIn();
            // userInfo will be set by listenToAuthChanges
            if (result.user) {
              Swal.fire({
                title: "สำเร็จ!",
                text: "เข้าสู่ระบบสำเร็จ",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          } catch (error) {
            console.error("error at login:", error);
            await logout();
            set({ isLoading: false });
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: error?.response?.data?.message,
              icon: "error",
              showConfirmButton: true,
            });
          } finally {
            set({ isLoading: false });
          }
        },
        signOutSystem: () => {
          try {
            Swal.fire({
              title: "คุณแน่ใจหรือไม่?",
              text: "คุณกำลังจะออกจากระบบ!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#c1121f",
              cancelButtonColor: "#e5e5e5",
              confirmButtonText: "ใช่",
              cancelButtonText: "ไม่",
            }).then(async (result) => {
              if (result.isConfirmed) {
                set({ isLoading: true });
                await logout();
                await AuthServices.signOut();
                set({ isLoading: false });
                // userInfo will be set to null by listenToAuthChanges
                Swal.fire({
                  title: "สำเร็จ!",
                  text: "ลงชื่อออกจากระบบสำเร็จ",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                });
              }
            });
          } catch (error) {
            console.log("error at logout:", error);
            set({ isLoading: false });
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลงชื่อออกจากระบบได้ โปรดลองอีกครั้ง",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          } finally {
            set({ isLoading: false });
          }
        },
      };
    },
    { name: "auth" }
  )
);
