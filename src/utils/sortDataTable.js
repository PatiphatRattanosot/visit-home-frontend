export const sortPersonnelOptions = [
  { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
  { value: "SortToLess", label: "เรียงจากมากไปน้อย" },
  { value: "AlphaSortToMost", label: "เรียงตามลำดับตัวอักษร ก-ฮ" },
  { value: "AlphaSortToLess", label: "เรียงตามลำดับตัวอักษร ฮ-ก" },
  { value: "PrefixMr", label: "คำนำหน้า นาย-นาง" },
  { value: "PrefixMrs", label: "คำนำหน้า นาง-นาย" },
];

export const switchSortPersonnel = (options, sorted) => {
  switch (options) {
    case "SortToMost":
      sorted.sort((a, b) => a.user_id - b.user_id);
      break;
    case "SortToLess":
      sorted.sort((a, b) => b.user_id - a.user_id);
      break;
    case "AlphaSortToMost":
      sorted.sort((a, b) => {
        const nameA = `${a.first_name}${a.last_name}`;
        const nameB = `${b.first_name}${b.last_name}`;
        return nameA.localeCompare(nameB, "th", { sensitivity: "base" });
      });
      break;
    case "AlphaSortToLess":
      sorted.sort((a, b) => {
        const nameA = `${a.first_name}${a.last_name}`;
        const nameB = `${b.first_name}${b.last_name}`;
        return nameB.localeCompare(nameA, "th", { sensitivity: "base" });
      });
      break;
    case "PrefixMr":
      sorted.sort((a, b) => {
        const prefixOrder = { นาย: 1, นางสาว: 2, นาง: 3 };
        return (prefixOrder[a.prefix] || 99) - (prefixOrder[b.prefix] || 99);
      });
      break;
    case "PrefixMrs":
      sorted.sort((a, b) => {
        const prefixOrder = { นาย: 1, นางสาว: 2, นาง: 3 };
        return (prefixOrder[b.prefix] || 99) - (prefixOrder[a.prefix] || 99);
      });
      break;
  }
};
