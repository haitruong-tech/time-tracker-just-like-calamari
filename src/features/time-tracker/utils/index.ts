import { LOCAL_STORAGE } from "../../../data/constants";
import { PURPOSES } from "../constants";
import type { Timer } from "../types/timer";

interface TrackerState {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  initialState: Timer[];
}

export const getTrackerState = (): TrackerState => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
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

interface IFormatDurationReturnValue {
  hour: string;
  minute: string;
  second: string;
}

export function formatDuration(duration: number): IFormatDurationReturnValue {
  const totalSecond = Math.floor(duration / 1000);
  const hour: number = Math.floor(totalSecond / 60 / 60);
  const minute: number = Math.floor((totalSecond / 60) % 60);
  const second: number = Math.floor(totalSecond % 60);

  const sHour = hour < 10 ? `0${hour}` : `${hour}`;
  const sMinute = minute < 10 ? `0${minute}` : `${minute}`;
  const sSecond = second < 10 ? `0${second}` : `${second}`;
  return { hour: sHour, minute: sMinute, second: sSecond };
}
