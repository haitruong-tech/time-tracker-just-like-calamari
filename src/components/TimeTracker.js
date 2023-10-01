import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { LOCAL_STORAGE } from "../constants";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const PURPOSES = {
  WORK: 0,
  BREAK: 1,
};

function TimeTracker() {
  const currentDate = new Date();
  const lastUpdate = useRef();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const initialStartTime = new Date(currentYear, currentMonth, currentDay, 8);
  const widthPerMillSecond = 352 / DAY;

  const [timers, setTimers] = useState(
    JSON.parse(
      localStorage.getItem(
        LOCAL_STORAGE.TIMERS.replace(
          "{date}",
          `${currentYear}-${currentMonth}-${currentDay}`
        )
      )
    ) ?? [
      {
        startTime: initialStartTime,
        duration: new Date() - initialStartTime,
        purpose: PURPOSES.BREAK,
      },
    ]
  );

  const active = () => {
    if (timers.at(-1)?.purpose === PURPOSES.WORK) return
    setTimers([
      ...timers.map((timer, index) => {
        if (index === timers.length - 1) {
          const current = new Date();
          const timePassed = current - lastUpdate.current;
          lastUpdate.current = current;
          return { ...timer, duration: timer.duration + timePassed };
        }
        return timer;
      }),
      {
        startTime: new Date(),
        duration: 0,
        purpose: PURPOSES.WORK,
      },
    ]);
  };

  const takeBreak = () => {
    if (timers.at(-1)?.purpose === PURPOSES.BREAK) return
    setTimers([
      ...timers.map((timer, index) => {
        if (index === timers.length - 1) {
          const current = new Date();
          const timePassed = current - lastUpdate.current;
          lastUpdate.current = current;
          return { ...timer, duration: timer.duration + timePassed };
        }
        return timer;
      }),
      {
        startTime: new Date(),
        duration: 0,
        purpose: PURPOSES.BREAK,
      },
    ]);
  };

  useEffect(() => {
    lastUpdate.current =
      new Date(JSON.parse(localStorage.getItem(LOCAL_STORAGE.LAST_UPDATE))) ?? new Date();
    const intervalID = setInterval(() => {
      setTimers((timers) => {
        const current = new Date();
        const timePassed = current - lastUpdate.current;
        lastUpdate.current = current;
        const newTimers = timers.map((timer, index) => {
          if (index === timers.length - 1) {
            return {
              ...timer,
              duration: timer.duration + timePassed,
            };
          }
          return timer;
        });
        localStorage.setItem(
          LOCAL_STORAGE.TIMERS.replace(
            "{date}",
            `${currentYear}-${currentMonth}-${currentDay}`
          ),
          JSON.stringify(newTimers)
        );
        localStorage.setItem(
          LOCAL_STORAGE.LAST_UPDATE,
          JSON.stringify(lastUpdate.current)
        );
        return newTimers;
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  const totalSecond = Math.floor(timers.at(-1).duration / 1000);
  const hour = Math.floor(totalSecond / 60 / 60);
  const minute = Math.floor((totalSecond / 60) % 60);
  const second = Math.floor(totalSecond % 60);
  return (
    <>
      <p>
        {hour < 10 ? `0${hour}` : hour}:{minute < 10 ? `0${minute}` : minute}:
        {second < 10 ? `0${second}` : second}
      </p>
      <div className="flex bg-gray-400">
        {timers.map((timer) => {
          return (
            <div
              key={timer.startTime}
              style={{ width: widthPerMillSecond * timer.duration }}
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
        <button className="px-2 py-1 bg-green-400" onClick={active}>
          Active
        </button>
        <button className="px-2 py-1 bg-orange-400" onClick={takeBreak}>
          Break
        </button>
      </div>
    </>
  );
}

export default TimeTracker;
