import { Link, useLocation, useParams } from 'react-router';

const Breadcrumbs = () => {
  const location = useLocation();
  const { year } = useParams(); // เช่น 2566
  const pathnames = location.pathname.split('/').filter((x) => x);

  const pathLabels = {
    admin: 'หน้าหลัก',
    teacher: 'หน้าหลัก (Teacher)',
    student: 'หน้าหลัก (Student)',
    personnel: 'บุคลากร',
    'manage-admin': 'จัดการตำแหน่ง',
    year: 'ปีการศึกษา',
    classroom: 'ชั้นเรียน',
    // สามารถเพิ่มเส้นทางอื่นได้ที่นี่
  };

  const breadcrumbItems = [];

  for (let i = 0; i < pathnames.length; i++) {
    const path = pathnames[i];
    const isLast = i === pathnames.length - 1;

    // เช็คว่ากำลังอยู่ที่ classroom + year จริง
    const isClassroomWithYear =
      path === 'classroom' &&
      pathnames[i + 2] === year; // ตรวจว่า path สุดท้ายเป็นปีการศึกษา

    const href = `/${pathnames.slice(0, i + 1).join('/')}`;

    if (isClassroomWithYear) {
      breadcrumbItems.push({
        label: `ชั้นเรียน ${year}`,
        href: `/${pathnames.slice(0, i + 3).join('/')}`,
      });
      break; // ไม่ต้อง loop ต่อแล้ว เพราะ label สุดท้ายคือ "ชั้นเรียน 2566"
    }

    breadcrumbItems.push({
      label: pathLabels[path] || path, // ถ้าไม่เจอใน pathLabels จะ fallback เป็นชื่อ path ตรง ๆ
      href,
    });
  }

  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul>
        {breadcrumbItems.map((item, index) => (
          <li key={index}>
            {index < breadcrumbItems.length - 1 ? (
              <Link to={item.href} className="text-gray-600 hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
