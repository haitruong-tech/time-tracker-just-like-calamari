import TimeTracker from "@features/time-tracker-v2";
import TimeTrackerErrorBoundary from "@features/time-tracker-v2/error-boundary";
import Todos from "@features/todos-v2";
import { memo } from "react";
import Navbar from "src/components/navbar";
import DragNDropProvider from "src/contexts/dragndrop";

const HomePage = memo(() => {
  return (
    <div className="w-screen min-h-screen text-[#eee] p-16">
      <Navbar />
      <div className="xl:pl-80 xl:pr-80 xl:mt-0 mt-8">
        <TimeTrackerErrorBoundary>
          <TimeTracker />
        </TimeTrackerErrorBoundary>
        <div className="mt-14">
          <DragNDropProvider>
            <Todos />
          </DragNDropProvider>
        </div>
      </div>
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
