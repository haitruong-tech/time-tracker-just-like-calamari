import clsx from "clsx";
import { PURPOSES } from "./constants";
import { formatDuration } from "./utils";
import { useContext } from "react";
import {
  TimeTrackerActionsContext,
  TimeTrackerContext,
} from "./contexts/TimeTrackerContext";
import { TodosContext } from "../todos-v1/contexts/TodosContext";
import { type Timer } from "./types/timer";

function TimeTracker(): JSX.Element {
  const todos = useContext(TodosContext);
  const { pxPerMillSecond, timers } = useContext(TimeTrackerContext);
  const { work, takeBreak, workout } = useContext(TimeTrackerActionsContext);
  const { hour, minute, second } = formatDuration(timers.at(-1)?.duration ?? 0);

  const renderTotal = (purpose: PURPOSES): string => {
    const { hour, minute, second } = formatDuration(
      timers.reduce((acc, timer) => {
        if (timer.purpose === purpose) acc += timer.duration;
        return acc;
      }, 0)
    );
    return `${hour}:${minute}:${second}`;
  };

  const renderTasksDone = (timer: Timer): JSX.Element => {
    const finishedTasks = todos.filter((todo) => {
      if (todo.doneInSessionID == null || timer.id == null) return false;
      return todo.doneInSessionID === timer.id;
    });
    return (
      <>
        {finishedTasks.length > 0 && (
          <>
            <p>Done in this session:</p>
            <ul>
              {finishedTasks.map((todo) => {
                return <li key={todo.id}>{todo.value}</li>;
              })}
            </ul>
          </>
        )}
      </>
    );
  };

  const renderTasksReverted = (timer: Timer): JSX.Element => {
    const finishedTasks = todos.filter((todo) => {
      if (todo.revertInSessionID == null || timer.id == null) return false;
      return todo.revertInSessionID === timer.id;
    });
    return (
      <>
        {finishedTasks.length > 0 && (
          <>
            <p>Reverted in this session:</p>
            <ul>
              {finishedTasks.map((todo) => {
                return <li key={todo.id}>{todo.value}</li>;
              })}
            </ul>
          </>
        )}
      </>
    );
  };

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
                  "bg-cyan-400": timer.purpose === PURPOSES.WORKOUT,
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
        <button className="px-2 py-1 bg-cyan-400" onClick={workout}>
          Workout
        </button>
      </div>
      <div>
        <p>Total</p>
        <p>Break: {renderTotal(PURPOSES.BREAK)}</p>
        <p>Work: {renderTotal(PURPOSES.WORK)}</p>
      </div>
      <div className="mt-2">
        {timers.map((timer) => {
          const {
            hour: totalHour,
            minute: totalMinute,
            second: totalsSecond,
          } = formatDuration(timer.duration);
          return (
            <div key={timer.startTime}>
              <span>
                Duration: {totalHour}:{totalMinute}:{totalsSecond}
              </span>
              <span> - </span>
              <span>Purpose: {PURPOSES[timer.purpose]}</span>
              {renderTasksDone(timer)}
              {renderTasksReverted(timer)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeTracker;
