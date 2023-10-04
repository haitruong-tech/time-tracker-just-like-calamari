import { LOCAL_STORAGE } from "../../../data/constants";
import { PURPOSES } from "../constants";

export const getTrackerState = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const startTime = new Date(currentYear, currentMonth, currentDay, 8);

  const initialState = JSON.parse(
    localStorage.getItem(
      LOCAL_STORAGE.TIMERS.replace(
        "{date}",
        `${currentYear}-${currentMonth}-${currentDay}`
      )
    )
  ) ?? [
    {
      startTime: startTime,
      duration: new Date() - startTime,
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

export function formatDuration(duration) {
  const totalSecond = Math.floor(duration / 1000);
  let hour = Math.floor(totalSecond / 60 / 60);
  let minute = Math.floor((totalSecond / 60) % 60);
  let second = Math.floor(totalSecond % 60);
  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  if (second < 10) second = `0${second}`;
  return { hour, minute, second };
}
