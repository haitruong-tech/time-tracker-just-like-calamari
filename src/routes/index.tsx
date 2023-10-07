import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/Homepage-v2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
