export const getRoleDisplay = (role) => {
  const roles = Array.isArray(role) ? role : [role]; // แปลงให้เป็น array เสมอ
  //ใช้ includes() เรียงลำดับความสำคัญของบทบาท และ คืนค่าชื่อบทบาทที่เหมาะสม
  if (roles.includes("Admin")) return "เจ้าหน้าที่ฝ่ายทะเบียน";
  if (roles.includes("Teacher")) return "คุณครู";
  if (roles.includes("Student")) return "นักเรียน";

  return "ไม่ทราบบทบาท";
};

export const showStatus = (status) => {
  switch (status) {
    case "ใช้งานอยู่":
      return (
        <div className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
          ใช้งานอยู่
        </div>
      );
    case "ไม่ได้ใช้งานแล้ว":
      return (
        <div className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
          ไม่ได้ใช้งานแล้ว
        </div>
      );
    default:
      return (
        <div className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
          ลาออก
        </div>
      );
  }
};
