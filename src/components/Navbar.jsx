import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { getNavLinks } from "../utils/navbarRole";
import { useNavigate } from "react-router";

const Navbar = ({ user, userInfo, googleSignIn, logout }) => {
  const navigate = useNavigate();
  console.log(userInfo?.role);
  const [switchNavbar, setSwitchNavbar] = useState(() => {
    // localStorage.getItem() หมายถึงการดึงค่าจาก localStorage
    // ถ้าไม่มีค่าใน localStorage จะใช้ค่าเริ่มต้นเป็น null
    // ใช้ฟังก์ชันเพื่อให้แน่ใจว่าใช้ค่าเริ่มต้นเพียงครั้งเดียวตามนั้น
    return localStorage.getItem("activeNavbarRole") || null;
  });
  useEffect(() => {
    if (!switchNavbar && userInfo?.role) {
      if (userInfo.role.includes("Admin")) {
        localStorage.setItem("activeNavbarRole", "Admin");
        setSwitchNavbar("Admin");
      } else if (userInfo.role.includes("Teacher")) {
        localStorage.setItem("activeNavbarRole", "Teacher");
        setSwitchNavbar("Teacher");
      } else if (userInfo.role.includes("Student")) {
        localStorage.setItem("activeNavbarRole", "Student");
        setSwitchNavbar("Student");
      } else {
        localStorage.removeItem("activeNavbarRole");
        setSwitchNavbar(null);
      }
    }
    if (!user || !userInfo) {
      localStorage.removeItem("activeNavbarRole");
      setSwitchNavbar(null);
    }
  }, [userInfo, user, googleSignIn, logout, switchNavbar]);
  const toggleNavbarRole = () => {
    const newRole = switchNavbar === "Admin" ? "Teacher" : "Admin";
    localStorage.setItem("activeNavbarRole", newRole);
    setSwitchNavbar(newRole);

    if (newRole === "Teacher") {
      navigate("/teacher");
    } else if (newRole === "Admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm grid grid-cols-2 md:grid-cols-3 grid-rows-1">
      {/* Left zone */}
      <div className="flex space-x-1.5 items-center justify-start">
        {/* Hamburger btn */}
        {/* Drawer Toggle */}
        {user && userInfo && (
          <label
            htmlFor="navbar-drawer"
            className="btn-hamburger drawer-button"
          >
            <RxHamburgerMenu className="size-4.5" />
          </label>
        )}
        {/* Home btn */}
        <a href="/" className="flex items-center gap-2" id="btn-home">
          <img src="/logo.png" alt="logo" className="size-11" />
          <span className="font-semibold hidden md:flex">
            ระบบบันทึกการเยี่ยมบ้านโรงเรียนบางแพปฐมพิทยา
          </span>
        </a>
      </div>
      {/* Center zone */}
      <div className="md:flex items-center list-none gap-6 hidden text-sm justify-center">
        {user && userInfo && getNavLinks(userInfo?.role, switchNavbar)}
      </div>
      {/* Right zone */}
      <div className="flex gap-2 items-center justify-end">
        {userInfo?.role.includes("Admin") && (
          <button
            id="btn-switch-navbar"
            onClick={toggleNavbarRole}
            className="btn btn-sm btn-outline"
          >
            สลับเป็น {switchNavbar === "Admin" ? "คุณครู" : "แอดมิน"}
          </button>
        )}
        {/* ปุ่มเข้าสู่ระบบและออกจากระบบ */}
        {user && userInfo ? (
          <>
            <span className="text-sm text-[#03045e] hidden md:flex">
              สวัสดี{" "}
              {userInfo?.prefix +
                " " +
                userInfo?.first_name +
                " " +
                userInfo?.last_name}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="btn-red"
              id="btn-logout"
            >
              ออกจากระบบ
            </button>
          </>
        ) : (
          <>
            <button onClick={googleSignIn} className="btn-blue" id="btn-login">
              ลงชื่อเข้าใช้งาน
            </button>
          </>
        )}
      </div>

      {/* Drawer Structure (outside navbar for layout control) */}
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50 md:hidden">
        <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {getNavLinks(userInfo?.role, switchNavbar)}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
