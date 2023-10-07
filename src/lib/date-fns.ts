import { format } from "date-fns";
import { assertValidDate } from "src/utils";

export const formatHour = (dateString: Date | string): string => {
  const date: Date | string = new Date(dateString); // maybe return "Invalid Date"
  assertValidDate(date);
  return format(date, "H:mm a");
};

export const formatDate = (dateString: Date | string): string => {
  const date: Date | string = new Date(dateString);
  assertValidDate(date);
  return format(date, "Y/MM/dd");
};
