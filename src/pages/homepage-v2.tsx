import TimeTracker from "@features/time-tracker-v2";
import TimeTrackerErrorBoundary from "@features/time-tracker-v2/error-boundary";
import Todos from "@features/todos-v2";
import { memo } from "react";
import DragNDropProvider from "src/contexts/dragndrop";

const HomePage = memo(() => {
  return (
    <>
      <TimeTrackerErrorBoundary>
        <TimeTracker />
      </TimeTrackerErrorBoundary>
      <div className="mt-14">
        <DragNDropProvider>
          <Todos />
        </DragNDropProvider>
      </div>
    </>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
