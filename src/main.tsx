import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Login from "./pages/Login.tsx";
import Main from "./pages/Main.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import User from "./pages/User.tsx";
import Users from "./pages/Users.tsx";

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
          { path: "/users", element: <Users /> },
          { path: "/users/user/:id", element: <User /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </Provider>
);
