import clsx from "clsx";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import {
  TimeTrackerActionsContext,
  TimeTrackerContext,
} from "./contexts/TimeTrackerContext";
import { StartIcon, StopIcon } from "src/assets/icons";
import { PURPOSES } from "./constants";
import { formatDate, formatHour } from "src/lib/date-fns";
import { addDays } from "date-fns";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function TimeTracker(): JSX.Element {
  const { timers } = useContext(TimeTrackerContext);
  const { work, takeBreak } = useContext(TimeTrackerActionsContext);
  const startDate = new Date(timers[0]?.startTime);
  const timerRef = useRef<HTMLDivElement>(null);
  const [pxPerMillSecond, setPxPerMillSecond] = useState(0);

  useLayoutEffect(() => {
    const resizeCallback = (): void => {
      if (timerRef.current == null) return;
      setPxPerMillSecond(timerRef.current.offsetWidth / DAY);
    };
    window.addEventListener("resize", resizeCallback);
    return resizeCallback;
  }, [timerRef.current]);

  return (
    <div>
      <div>
        {timers.at(-1)?.purpose === PURPOSES.BREAK && (
          <div>
            <StartIcon
              className="block cursor-pointer mx-auto hover:text-[#29C81E]/[.75] transition text-[#29C81E]"
              onClick={work}
            />
          </div>
        )}
        {timers.at(-1)?.purpose === PURPOSES.WORK && (
          <div>
            <StopIcon
              className="mx-auto block cursor-pointer hover:text-[#E23703]/[.75] transition text-[#E23703]"
              onClick={takeBreak}
            />
          </div>
        )}
      </div>
      <div className="mt-14">
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
}

export default TimeTracker;
