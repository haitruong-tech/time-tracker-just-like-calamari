import { RECORD, UPDATE_PROGRESS } from "../constants";
import type { Timer, TimerActions } from "../types/timer";
import { v4 as uuidv4 } from "uuid";
import { getDateComponents } from "../utils";

export function timeTrackerReducer(
  timers: Timer[],
  action: TimerActions
): void {
  switch (action.type) {
    case RECORD: {
      const timer = timers.at(-1);
      if (timer == null) return;
      const currentDate = new Date();
      timer.duration += currentDate.getTime() - action.payload.lastUpdate;
      timers.push({
        id: uuidv4(),
        startTime: currentDate.toISOString(),
        duration: 0,
        purpose: action.payload.purpose,
      });
      return;
    }
    case UPDATE_PROGRESS: {
      let timer = timers.at(-1);
      if (timer == null) return;
      const currentDate = new Date();
      const { year, month, day } = getDateComponents(currentDate);
      if (new Date(timer.startTime).getDate() < day) {
        const dayStartTime = new Date(year, month, day);
        timer = {
          id: uuidv4(),
          startTime: dayStartTime.toISOString(),
          duration: new Date().getTime() - dayStartTime.getTime(),
          purpose: timer.purpose,
        };
        timers.splice(0, timers.length, timer);
      } else {
        timer.duration += currentDate.getTime() - action.payload;
      }
    }
  }
}
