import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import TodoForm from "./components/TodoForm.jsx";
import AirdropForm from "./components/AirdropForm.jsx";
import WaitlistForm from "./components/WaitlistForm.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import HomePage from "./components/HomePage.jsx";
import DetailsPage from "./components/Detailspage.jsx";
import UpdateForm from "./components/UpdateForm.jsx";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/projectfomr.jsx",
        element: <ProjectForm />,
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
      {
        path: "/details/:id",
        element: <UpdateForm />,
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
