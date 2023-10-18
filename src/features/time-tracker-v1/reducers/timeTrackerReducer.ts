import { RECORD, UPDATE_PROGRESS } from "../constants";
import type { Timer, TimerActions } from "../types/timer";
import { v4 as uuidv4 } from "uuid";

export function timeTrackerReducer(
  timers: Timer[],
  action: TimerActions
): void {
  switch (action.type) {
    case RECORD: {
      const timer = timers.at(-1);
      if (timer == null) return;
      timer.duration += new Date().getTime() - action.payload.lastUpdate;
      timers.push({
        id: uuidv4(),
        startTime: new Date().toISOString(),
        duration: 0,
        purpose: action.payload.purpose,
      });
      return;
    }
    case UPDATE_PROGRESS: {
      let timer = timers.at(-1);
      if (timer == null) return;
      const currentDate = new Date();
      if (new Date(timer.startTime).getDate() < currentDate.getDate()) {
        timer = {
          id: uuidv4(),
          startTime: currentDate.toISOString(),
          duration: new Date().getTime() - currentDate.getTime(),
          purpose: timer.purpose,
        };
        // Currently, we delete all timers every new day
        // migrate to DB for persist storage
        timers.splice(0, timers.length, timer);
      } else timer.duration += currentDate.getTime() - action.payload;
    }
  }
}
