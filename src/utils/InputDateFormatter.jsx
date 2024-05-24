import { format } from "date-fns";

export function InputDateFormatter(date) {
  let formattedDate = "";
  formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
  return formattedDate;
}
