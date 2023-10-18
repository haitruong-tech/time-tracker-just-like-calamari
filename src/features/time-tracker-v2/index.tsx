import clsx from "clsx";
import { memo, useContext, useLayoutEffect, useRef, useState } from "react";
import {
  TimeTrackerActionsContext,
  TimeTrackerContext,
} from "./contexts/TimeTrackerContext";
import { StartIcon, StopIcon } from "src/assets/icons";
import { PURPOSES } from "./constants";
import { formatDate, formatHour, addDays } from "src/lib/date-fns";
import { formatDuration } from "./utils";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const TimeTracker = memo(() => {
  const { timers } = useContext(TimeTrackerContext);
  const { work, takeBreak } = useContext(TimeTrackerActionsContext);
  const startDate = new Date(timers[0]?.startTime);
  const timerRef = useRef<HTMLDivElement>(null);
  const [pxPerMillSecond, setPxPerMillSecond] = useState(0);
  const timer = timers.at(-1);

  useLayoutEffect(() => {
    const resizeCallback = (): void => {
      if (timerRef.current == null) return;
      setPxPerMillSecond(timerRef.current.offsetWidth / DAY);
    };
    resizeCallback();
    window.addEventListener("resize", resizeCallback);
    return resizeCallback;
  }, [timerRef.current]);

  if (timer == null) throw new Error("No timer found");

  return (
    <div>
      <div>
        {timer.purpose === PURPOSES.BREAK && (
          <div>
            <StartIcon
              className="block cursor-pointer mx-auto hover:text-[#29C81E]/[.75] transition text-[#29C81E]"
              onClick={work}
            />
          </div>
        )}
        {timer.purpose === PURPOSES.WORK && (
          <div>
            <StopIcon
              className="mx-auto block cursor-pointer hover:text-[#E23703]/[.75] transition text-[#E23703]"
              onClick={takeBreak}
            />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-center mt-8 text-4xl">
          {formatDuration(timer.duration)}
        </h2>
      </div>
      <div className="mt-12">
        <div
          ref={timerRef}
          className="flex bg-white h-10 relative before:content-[''] before:absolute before:h-16 before:w-px before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-white after:content-[''] after:absolute after:h-16 after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-white"
        >
          {timers.map((timer) => {
            return (
              <div
                key={timer.id}
                style={{ width: pxPerMillSecond * timer.duration }}
                className={clsx({
                  "bg-orange-400": timer.purpose === PURPOSES.BREAK,
                  "bg-green-400": timer.purpose === PURPOSES.WORK,
                  "bg-cyan-400": timer.purpose === PURPOSES.WORKOUT,
                })}
              />
            );
          })}
        </div>
        <div className="flex justify-between">
          <div className="mt-4">
            <p className="text-xl">{formatHour(startDate)}</p>
            <p className="text-[#eee]/[.75]">{formatDate(startDate)}</p>
          </div>
          <div className="mt-4 text-right">
            <p className="text-xl">{formatHour(addDays(startDate, 1))}</p>
            <p className="text-[#eee]/[.75]">
              {formatDate(addDays(startDate, 1))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

TimeTracker.displayName = "TimeTracker";

export default TimeTracker;
