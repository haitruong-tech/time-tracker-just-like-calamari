import { useEffect, useRef } from "react";
import { LOCAL_STORAGE } from "../../../data/constants";
import { PURPOSES, RECORD, UPDATE_PROGRESS } from "../constants";
import { getTrackerState } from "../utils";
import { useImmerReducer } from "use-immer";
import { timeTrackerReducer } from "../reducers/timeTrackerReducer";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function useTimeTracker() {
  const { currentDay, currentMonth, currentYear, initialState } =
    getTrackerState();
  const [timers, dispatch] = useImmerReducer(timeTrackerReducer, initialState);
  const lastUpdate = useRef();
  const pxPerMillSecond = 352 / DAY; // width of the time bar / time

  const persistLastUpdate = () => {
    localStorage.setItem(
      LOCAL_STORAGE.LAST_UPDATE,
      JSON.stringify(lastUpdate.current)
    );
  };

  const work = () => {
    if (timers.at(-1).purpose === PURPOSES.WORK) return;
    dispatch({
      type: RECORD,
      payload: {
        purpose: PURPOSES.WORK,
        lastUpdate: lastUpdate.current,
      },
    });
    lastUpdate.current = new Date();
    persistLastUpdate();
  };

  const takeBreak = () => {
    if (timers.at(-1)?.purpose === PURPOSES.BREAK) return;
    dispatch({
      type: RECORD,
      payload: {
        purpose: PURPOSES.BREAK,
        lastUpdate: lastUpdate.current,
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
      new Date(JSON.parse(localStorage.getItem(LOCAL_STORAGE.LAST_UPDATE))) ??
      new Date();

    function updateProgress() {
      dispatch({ type: UPDATE_PROGRESS, payload: lastUpdate.current });
      lastUpdate.current = new Date();
      persistLastUpdate();
    }
    updateProgress();
    const intervalID = setInterval(() => {
      updateProgress();
    }, 1000);
    return () => clearInterval(intervalID);
  }, [currentDay, currentMonth, currentYear]);

  return { timers, pxPerMillSecond, work, takeBreak };
}

export default useTimeTracker;
