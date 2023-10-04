import { RECORD, UPDATE_PROGRESS } from "../constants";

export function timeTrackerReducer(timers, action) {
  switch (action.type) {
    case RECORD: {
      const timer = timers.at(-1);
      timer.duration += new Date() - action.payload.lastUpdate;
      timers.push({
        startTime: new Date(),
        duration: 0,
        purpose: action.payload.purpose,
      });
      return;
    }
    case UPDATE_PROGRESS: {
      let timer = timers.at(-1);

      const currentDate = new Date();
      if (new Date(timer.startTime).getDate() < currentDate.getDate()) {
        timer = {
          startTime: currentDate,
          duration: new Date() - action.payload,
          purpose: timer.purpose,
        };
        timers.splice(0, timers.length, timer);
      } else timer.duration += currentDate - action.payload;

      return;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
