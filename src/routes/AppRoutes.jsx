import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "home", element: <Home /> },
          { path: "profile", element: <Profile /> },
          { path: "/", element: <Dashboard /> },
        ],
      },
    ],
  },
]);

export default router;
