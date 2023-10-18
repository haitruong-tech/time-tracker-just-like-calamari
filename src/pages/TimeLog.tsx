import { TimeTrackerContext } from "@features/time-tracker-v2/contexts/TimeTrackerContext";
import { type Timer } from "@features/time-tracker-v2/types/timer";
import { TodosContext } from "@features/todos-v2/contexts/TodosContext";
import { type Todo } from "@features/todos-v2/types/todo";
import { memo, useContext } from "react";
import { formatHour, addSeconds } from "src/lib/date-fns";

const TimeLog = memo(() => {
  const { todos } = useContext(TodosContext);
  const { timers } = useContext(TimeTrackerContext);

  // const todosLogs = timers.filter((timer) =>
  //   todos.some(
  //     (todo) =>
  //       todo.doneInSessionID === timer.id || todo.revertInSessionID === timer.id
  //   )
  // );
  const todosLogs = timers
    .reduce(
      (
        acc: Array<{
          timer: Timer;
          todosDoneInThisSession: Todo[];
          todosRevertedInThisSession: Todo[];
        }>,
        timer: Timer
      ) => {
        const todosDoneInThisSession = todos.filter(
          (todo) => todo.doneInSessionID === timer.id
        );
        const todosRevertedInThisSession = todos.filter(
          (todo) => todo.revertInSessionID === timer.id
        );
        if (
          todosDoneInThisSession.length === 0 &&
          todosRevertedInThisSession.length === 0
        )
          return acc;
        return [
          ...acc,
          { timer, todosDoneInThisSession, todosRevertedInThisSession },
        ];
      },
      []
    )
    .sort(
      (timer1, timer2) =>
        new Date(timer1.timer.startTime).getTime() -
        new Date(timer2.timer.startTime).getTime()
    );
  console.log(todosLogs);

  return (
    <main>
      <h1 className="text-2xl font-bold">Time Log</h1>
      <ul className="mt-4 text-xl">
        {todosLogs.map((log) => (
          <li
            key={log.timer.id}
            className="[&:not(:first-child)]:mt-4 list-inside marker:inline-block marker:text-[22px] list-disc"
          >
            <p className="font-bold inline-block -ml-2">
              <span>
                {formatHour(new Date(log.timer.startTime))} -{" "}
                {formatHour(
                  addSeconds(
                    new Date(log.timer.startTime),
                    log.timer.duration / 1000
                  )
                )}
                :
              </span>{" "}
              <span className="text-[#3EA33E]">Work</span>
            </p>
            {log.todosDoneInThisSession.length > 0 && (
              <ul className="ml-5 mt-3">
                <li className="before:content-['+'] before:mr-[1ch]">
                  <span>Tasks done:</span>
                  <ul className="ml-6">
                    {log.todosDoneInThisSession.map((todo) => (
                      <li
                        key={todo.id}
                        className="list-inside marker:text-[18px] list-disc"
                      >
                        {todo.value}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            )}
            {log.todosRevertedInThisSession.length > 0 && (
              <ul className="ml-5 mt-2">
                <li className="before:content-['+'] before:mr-[1ch]">
                  <span>Tasks reverted:</span>
                  <ul className="ml-6">
                    {log.todosRevertedInThisSession.map((todo) => {
                      return (
                        <li
                          key={todo.id}
                          className="list-inside marker:text-[18px] list-disc"
                        >
                          {todo.value}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
});

TimeLog.displayName = "TimeLog";

export default TimeLog;
