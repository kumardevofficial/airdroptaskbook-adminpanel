import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import GalxeForm from "./components/GalxeForm.jsx";
import TodoForm from "./components/TodoForm.jsx";
import AirdropForm from "./components/AirdropForm.jsx";
import WaitlistForm from "./components/WaitlistForm.jsx";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/galxeform",
        element: <GalxeForm />,
      },
      {
        path: "/todoform",
        element: <TodoForm />,
      },
      {
        path: "/airdropform",
        element: <AirdropForm />,
      },
      {
        path: "/waitlistform",
        element: <WaitlistForm />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
