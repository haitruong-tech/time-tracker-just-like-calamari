import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import TimeTrackerProvider from "@features/time-tracker-v2/contexts/TimeTrackerContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodosProvider from "@features/todos-v2/contexts/TodosContext";

function App(): JSX.Element {
  return (
    <TimeTrackerProvider>
      <TodosProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </TodosProvider>
    </TimeTrackerProvider>
  );
}

export default App;
