import TimeTracker from "@features/time-tracker-v2";
import TimeTrackerErrorBoundary from "@features/time-tracker-v2/error-boundary";
import Todos from "@features/todos-v2";
import { memo, useState } from "react";
import TaskDetailsModal from "src/components/Modal/task-details";
import Navbar from "src/components/navbar";

const HomePage = memo(() => {
  const [todoID, setTodoID] = useState<null | string>(null);

  return (
    <div className="w-screen min-h-screen text-[#eee] p-16">
      <Navbar />
      <div className="xl:pl-80 xl:pr-80 xl:mt-0 mt-8">
        <TimeTrackerErrorBoundary>
          <TimeTracker />
        </TimeTrackerErrorBoundary>
        <div className="mt-14">
          <Todos
            onTaskClicked={(todoID: string) => {
              setTodoID(todoID);
            }}
          />
        </div>
      </div>
      {todoID != null && (
        <TaskDetailsModal
          todoID={todoID}
          closeModal={() => {
            setTodoID(null);
          }}
        />
      )}
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
