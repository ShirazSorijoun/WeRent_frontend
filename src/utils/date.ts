import { format } from "date-fns";

export const dateFormater = (date: string | Date) =>
  format(new Date(date), "HH:mm - dd.MM.yyyy");
