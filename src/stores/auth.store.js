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
      let unsubscribeAuthListener = null; // To hold the unsubscribe function

      // Listen to auth state changes
      listenToAuthChanges(async (user) => {
        if (!unsubscribeAuthListener) {
          // Set unsubscribeAuthListener to prevent multiple triggers
          unsubscribeAuthListener = () => {}; // Just a placeholder function initially
        }

        // Run this logic only once when the user first logs in or logs out
        if (user) {
          set({ user, isLoading: false });
          try {
            const res = await AuthServices.sign({ email: user.email });
            if (res.status === 200) {
              set({ userInfo: res.data?.user });
            } else {
              set({ userInfo: null });
            }
          } catch (error) {
            set({ userInfo: null });
            const errorMessage =
              error?.response?.data?.message || "ไม่พบผู้ใช้ในระบบ";
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: errorMessage,
              icon: "error",
              showConfirmButton: true,
            });
          }
          // Unsubscribe from auth listener after first execution
          if (unsubscribeAuthListener) {
            unsubscribeAuthListener(); // Unsubscribe after handling auth change
            unsubscribeAuthListener = null; // Reset listener
          }
        } else {
          // If no user is signed in, reset userInfo
          set({ user: null, userInfo: null, isLoading: false });
        }
      });

      return {
        user: null,
        userInfo: null,
        isLoading: false,
        signInSystem: async () => {
          set({ isLoading: true });
          let swalOptions = {};
          try {
            const result = await googleSignIn();
            if (result.user && result.user.email) {
              const res = await AuthServices.sign({ email: result.user.email });
              if (res.status === 200) {
                swalOptions = {
                  title: "สำเร็จ!",
                  text: res?.data?.message || "เข้าสู่ระบบสำเร็จ",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                };
              } else {
                swalOptions = {
                  title: "เกิดข้อผิดพลาด",
                  text: res?.data?.message || "ไม่สามารถเข้าสู่ระบบได้",
                  icon: "error",
                  showConfirmButton: true,
                };
              }
            } else {
              swalOptions = {
                title: "เกิดข้อผิดพลาด",
                text: "ไม่พบข้อมูลผู้ใช้จาก Google",
                icon: "error",
                showConfirmButton: true,
              };
            }
          } catch (error) {
            await logout();
            swalOptions = {
              title: "เกิดข้อผิดพลาด",
              text:
                error?.response?.data?.message ||
                "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
              icon: "error",
              showConfirmButton: true,
            };
          } finally {
            set({ isLoading: false });
            Swal.fire(swalOptions);
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
