import { format } from "date-fns";
import { th } from "date-fns/locale";

export function formatThaiDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const dayMonth = format(d, "d MMMM", { locale: th });
  const year = d.getFullYear() + 543;
  return `${dayMonth} ${year}`;
}
