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
    )
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

export function formatDuration(duration: number) {
  const totalSecond = Math.floor(duration / 1000);
  let hour: string | number = Math.floor(totalSecond / 60 / 60);
  let minute: string | number = Math.floor((totalSecond / 60) % 60);
  let second: string | number = Math.floor(totalSecond % 60);

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  if (second < 10) second = `0${second}`;
  return { hour, minute, second };
}
