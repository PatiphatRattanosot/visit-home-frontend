export const caseMapping = (field, value) => {
  switch (field) {
    case "overall_problem":
      switch (value) {
        case "0":
          return "ไม่";
        case "1":
          return "มีปัญหาเล็กน้อย";
        case "2":
          return "มีปัญหาชัดเจน";
        case "3":
          return "มีปัญหามาก";
        default:
          return "-";
      }

    case "problem_time":
      switch (value) {
        case "0":
          return "น้อยกว่า 1 เดือน";
        case "1":
          return "1-5 เดือน";
        case "2":
          return "6-12 เดือน";
        case "3":
          return "มากกว่า 1 ปี";
        default:
          return "-";
      }

    case "is_uneasy_student":
    case "is_annoy_student":
    case "is_difficult_student":
      switch (value) {
        case "0":
          return "ไม่";
        case "1":
          return "เล็กน้อย";
        case "2":
          return "ค่อนข้างมาก";
        case "3":
          return "มาก";
        default:
          return "-";
      }

    default:
      return value || "-";
  }
};
