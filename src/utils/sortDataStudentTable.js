export const sortStudentOptions = [
            { value: "SortToMost", label: "เรียงเลข น้อย → มาก" },
            { value: "MostToSort", label: "เรียงเลข มาก → น้อย" },
            { value: "AlphaSortToMost", label: "ชื่อ ก → ฮ" },
            { value: "AlphaMostToSort", label: "ชื่อ ฮ → ก" },
          ];

export const switchSortStudent = (options, sorted) => {
  switch (options) {
    case "SortToMost":
      sorted.sort((a, b) => Number(a.user_id) - Number(b.user_id));
      break;
    case "MostToSort":
      sorted.sort((a, b) => Number(b.user_id) - Number(a.user_id));
      break;
    case "AlphaSortToMost":
      sorted.sort((a, b) =>
        (a.first_name + a.last_name).localeCompare(
          b.first_name + b.last_name,
          "th"
        )
      );
      break;
    case "AlphaMostToSort":
      sorted.sort((a, b) =>
        (b.first_name + b.last_name).localeCompare(
          a.first_name + a.last_name,
          "th"
        )
      );
      break;
    default:
      break;
  }
};
