import { useEffect, useRef } from "react";
import { LOCAL_STORAGE } from "../../../data/constants";
import { PURPOSES, RECORD, UPDATE_PROGRESS } from "../constants";
import { getTrackerState } from "../utils";
import { useImmerReducer } from "use-immer";
import { timeTrackerReducer } from "../reducers/timeTrackerReducer";
import { type Timer } from "../types/timer";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

interface IUseTimeTrackerReturnValue {
  timers: Timer[];
  pxPerMillSecond: number;
  work: () => void;
  takeBreak: () => void;
}

function useTimeTracker(): IUseTimeTrackerReturnValue {
  const { currentDay, currentMonth, currentYear, initialState } =
    getTrackerState();
  const [timers, dispatch] = useImmerReducer(timeTrackerReducer, initialState);
  const lastUpdate = useRef<Date>();
  const pxPerMillSecond = 352 / DAY; // width of the time bar / time

  const persistLastUpdate = (): void => {
    localStorage.setItem(
      LOCAL_STORAGE.LAST_UPDATE,
      JSON.stringify(lastUpdate.current)
    );
  };

  const work = (): void => {
    if (
      timers.at(-1)?.purpose === PURPOSES.WORK ||
      lastUpdate.current === undefined ||
      lastUpdate.current === null
    )
      return;
    dispatch({
      type: RECORD,
      payload: {
        purpose: PURPOSES.WORK,
        lastUpdate: lastUpdate.current.getTime(),
      },
    });
    lastUpdate.current = new Date();
    persistLastUpdate();
  };

  const takeBreak = (): void => {
    if (
      timers.at(-1)?.purpose === PURPOSES.BREAK ||
      lastUpdate.current === undefined ||
      lastUpdate.current === null
    )
      return;
    dispatch({
      type: RECORD,
      payload: {
        purpose: PURPOSES.BREAK,
        lastUpdate: lastUpdate.current.getTime(),
      },
    });
    lastUpdate.current = new Date();
    persistLastUpdate();
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.TIMERS.replace(
        "{date}",
        `${currentYear}-${currentMonth}-${currentDay}`
      ),
      JSON.stringify(timers)
    );
  }, [timers]);

  useEffect(() => {
    lastUpdate.current =
      new Date(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.LAST_UPDATE) as string)
      ) ?? new Date();

    function updateProgress(): void {
      if (lastUpdate.current === undefined || lastUpdate.current === null)
        return;
      dispatch({
        type: UPDATE_PROGRESS,
        payload: lastUpdate.current.getTime(),
      });
      lastUpdate.current = new Date();
      persistLastUpdate();
    }
    updateProgress();

    const intervalID = setInterval(() => {
      updateProgress();
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [currentDay, currentMonth, currentYear]);

  return { timers, pxPerMillSecond, work, takeBreak };
}

export default useTimeTracker;
