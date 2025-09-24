import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Main from "./components/layout/Main.tsx";
import { MantineProvider } from "@mantine/core";
import User from "./pages/User.tsx";
import Users from "./pages/Users.tsx";
import Home from "./pages/Home.tsx";
import Layout from "./components/layout/Layout.tsx";
import Projects from "./pages/Projects.tsx";
import Project from "./pages/Project.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: <Main />,
        children: [
          { path: "/", element: <Home /> },
          { path: "users", element: <Users /> },
          { path: "users/user/:id", element: <User /> },
          { path: "projects", element: <Projects /> },
          { path: "projects/project/:id", element: <Project /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider>
       <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
);
