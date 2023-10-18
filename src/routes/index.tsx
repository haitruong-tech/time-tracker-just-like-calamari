import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/homepage-v2";
import LayoutDark from "src/layouts/dark";
import TimeLog from "@pages/TimeLog";

export const ROUTES = {
  HOME: "/",
  TIME_LOG: "/time-log",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <LayoutDark />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.TIME_LOG,
        element: <TimeLog />,
      },
    ],
  },
]);
