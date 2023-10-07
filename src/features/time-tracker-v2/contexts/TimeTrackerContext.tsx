import { createContext, useEffect, useRef } from "react";
import { LOCAL_STORAGE } from "../../../data/constants";
import { PURPOSES, RECORD, UPDATE_PROGRESS } from "../constants";
import { getTrackerState } from "../utils";
import { useImmerReducer } from "use-immer";
import { timeTrackerReducer } from "../reducers/timeTrackerReducer";
import { type ITimerContext, type ITimerActionsContext } from "../types/timer";

export const TimeTrackerContext = createContext<ITimerContext>({
  timers: [],
});
export const TimeTrackerActionsContext = createContext<ITimerActionsContext>({
  takeBreak: () => {},
  work: () => {},
  workout: () => {},
});

interface TimeTrackerProviderProps {
  children: React.ReactNode;
}

function TimeTrackerProvider({
  children,
}: TimeTrackerProviderProps): JSX.Element {
  const { currentDay, currentMonth, currentYear, initialState } =
    getTrackerState();
  const [timers, dispatch] = useImmerReducer(timeTrackerReducer, initialState);
  const lastUpdate = useRef<Date>();

  const persistLastUpdate = (): void => {
    localStorage.setItem(
      LOCAL_STORAGE.LAST_UPDATE,
      JSON.stringify(lastUpdate.current)
    );
  };

  const recordSession = (purpose: PURPOSES): void => {
    if (
      timers.at(-1)?.purpose === purpose ||
      lastUpdate.current === undefined ||
      lastUpdate.current === null
    )
      return;
    dispatch({
      type: RECORD,
      payload: {
        purpose,
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
    lastUpdate.current = new Date(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE.LAST_UPDATE) as string) ??
        new Date()
    );

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

  // return { timers, pxPerMillSecond, work, takeBreak };
  return (
    <TimeTrackerContext.Provider value={{ timers }}>
      <TimeTrackerActionsContext.Provider
        value={{
          work: () => {
            recordSession(PURPOSES.WORK);
          },
          takeBreak: () => {
            recordSession(PURPOSES.BREAK);
          },
          workout: () => {
            recordSession(PURPOSES.WORKOUT);
          },
        }}
      >
        {children}
      </TimeTrackerActionsContext.Provider>
    </TimeTrackerContext.Provider>
  );
}

export default TimeTrackerProvider;
