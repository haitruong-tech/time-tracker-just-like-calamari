import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import TimeTrackerProvider from "@features/time-tracker-v2/contexts/TimeTrackerContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodosProvider from "@features/todos-v2/contexts/TodosContext";
import { memo } from "react";
import ModalProvider, { ModalContainer } from "./contexts/modal";

const App = memo(() => {
  return (
    <TimeTrackerProvider>
      <TodosProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <ModalContainer />
        </ModalProvider>
      </TodosProvider>
    </TimeTrackerProvider>
  );
});

App.displayName = "App";

export default App;
