import { format as libFormat } from "date-fns";
import { assertValidDate } from "src/utils";

export const customFormat = (
  dateString: Date | string | number,
  pattern: string
): string => {
  const date: Date | string = new Date(dateString); // maybe return "Invalid Date"
  assertValidDate(date);
  return libFormat(date, pattern);
};

export const formatHour = (dateString: Date | string): string => {
  const date: Date | string = new Date(dateString); // maybe return "Invalid Date"
  assertValidDate(date);
  return libFormat(date, "H:mm a");
};

export const formatDate = (dateString: Date | string): string => {
  const date: Date | string = new Date(dateString);
  assertValidDate(date);
  return libFormat(date, "Y/MM/dd");
};

export { addSeconds, addDays } from "date-fns";
