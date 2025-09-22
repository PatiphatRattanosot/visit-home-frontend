export const getNavLinks = (roles = [], activeRole = null) => {
  const role = activeRole;
  // const role = activeRole || (Array.isArray(roles) ? roles[0] : "")
  // ตรวจสอบว่า activeRole  ถูกส่งมาหรือไม่
  // ถ้ามีให้ใช้ค่านั้นเลย (เช่น "Admin", "Teacher")
  // ถ้าไม่มี ให้ใช้บทบาทแรกในอาร์เรย์ roles แทน (เช่น roles[0])
  // ถ้า roles ไม่ใช่อาร์เรย์ จะ fallback เป็น string ว่าง ""  เพื่

  if (role === "Admin") {
    return (
      <ul className="menu menu-vertical md:menu-horizontal px-1 ">
        <li>
          <a href="/admin">หน้าแรก</a>
        </li>
        <li>
          <a href="/admin/dashboard">วิเคราะห์ข้อมูล</a>
        </li>
        <li>
          <a href="/admin/manage-admin">จัดการสถานะบุคลากร</a>
        </li>
        <li>
          <a href="/admin/year">จัดการปีการศึกษา</a>
        </li>
        <li>
          <a href="/admin/year/classroom">จัดการชั้นเรียน</a>
        </li>
      </ul>
    );
  }

  if (role === "Teacher") {
    return (
      <ul className="menu menu-vertical md:menu-horizontal px-1">
        <li>
          <a href="/teacher">หน้าแรก</a>
        </li>
        <li>
          <a href="/teacher/visualization">วิเคราะห์ข้อมูล</a>
        </li>
        {/* <li>
          <a href="/teacher/sdq">ผลประเมิน SDQ</a>
        </li> */}
      </ul>
    );
  }

  if (role === "Student") {
    return (
      <ul className="menu menu-vertical md:menu-horizontal px-1">
        <li>
          <a href={`/student`}>หน้าแรก</a>
        </li>
        <li>
          <a href={`/student/visiting-info`}>ข้อมูลการเยี่ยมบ้าน</a>
        </li>
        <li>
          <details>
            <summary>ประเมิน SDQ</summary>
            <ul className="p-2">
              <li>
                <a href="/student/sdq-student">นักเรียน</a>
              </li>
              <li>
                <a href="/student/sdq-parent">ผู้ปกครอง</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    );
  }

  return null;
};
