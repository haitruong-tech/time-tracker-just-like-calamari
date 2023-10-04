import clsx from "clsx";
import useTimeTracker from "./hooks/useTimeTracker";
import { PURPOSES } from "./constants";
import { formatDuration } from "./utils";

function TimeTracker() {
  const { pxPerMillSecond, timers, work, takeBreak } = useTimeTracker();
  const { hour, minute, second } = formatDuration(timers.at(-1).duration);

  return (
    <div>
      <p>
        {hour}:{minute}:{second}
      </p>
      <div className="flex bg-gray-400">
        {timers.map((timer) => {
          return (
            <div
              key={timer.startTime}
              style={{ width: pxPerMillSecond * timer.duration }}
              className={clsx(
                {
                  "bg-orange-400": timer.purpose === PURPOSES.BREAK,
                  "bg-green-400": timer.purpose === PURPOSES.WORK,
                },
                "text-transparent"
              )}
            >
              .
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <button className="px-2 py-1 bg-green-400" onClick={work}>
          Active
        </button>
        <button className="px-2 py-1 bg-orange-400" onClick={takeBreak}>
          Break
        </button>
      </div>
    </div>
  );
}

export default TimeTracker;
