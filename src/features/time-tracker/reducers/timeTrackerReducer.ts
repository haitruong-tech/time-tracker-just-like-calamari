import { RECORD, UPDATE_PROGRESS } from "../constants";
import type { Timer, TimerActions } from "../types/timer";

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
          startTime: currentDate.toISOString(),
          duration: new Date().getTime() - action.payload,
          purpose: timer.purpose,
        };
        timers.splice(0, timers.length, timer);
      } else timer.duration += currentDate.getTime() - action.payload;
    }
  }
}
