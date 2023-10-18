import { LOCAL_STORAGE } from "../../../data/constants";
import { PURPOSES } from "../constants";
import type { Timer } from "../types/timer";
import { v4 as uuidv4 } from "uuid";

export enum MONTHS {
  JANUARY,
  FEBUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

interface DateComponents {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
}

interface TrackerState {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  initialState: Timer[];
}

export const getDateComponents = (
  dateString: string | Date
): DateComponents => {
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    throw Error("Invalid date string");
  }
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

export const getTrackerState = (): TrackerState => {
  const currentDate = new Date();
  const {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  } = getDateComponents(currentDate);
  const startTime = new Date(currentYear, currentMonth, currentDay, 0);

  // We get the timers of today by finding from the local storage
  // if not found then initialize it with a new timer
  // Default start time is 8 AM
  const initialState = JSON.parse(
    localStorage.getItem(
      LOCAL_STORAGE.TIMERS.replace(
        "{date}",
        `${currentYear}-${currentMonth}-${currentDay}`
      )
    ) as string
  ) ?? [
    {
      id: uuidv4(),
      startTime,
      duration: new Date().getTime() - startTime.getTime(),
      purpose: PURPOSES.BREAK,
    },
  ];

  return {
    currentDay,
    currentMonth,
    currentYear,
    initialState,
  };
};

export function formatDuration(duration: number): string {
  const totalSecond = Math.floor(duration / 1000);
  const hour: number = Math.floor(totalSecond / 60 / 60);
  const minute: number = Math.floor((totalSecond / 60) % 60);
  const second: number = Math.floor(totalSecond % 60);

  const sHour = hour < 10 ? `0${hour}` : `${hour}`;
  const sMinute = minute < 10 ? `0${minute}` : `${minute}`;
  const sSecond = second < 10 ? `0${second}` : `${second}`;
  return `${sHour}:${sMinute}:${sSecond}`;
}
