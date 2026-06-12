import { createBrowserRouter } from "react-router-dom";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
]);

export default router;