import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
        path:'/home',
        element: <Home/>
    },
    {
        path:'/dashboard',
        element: <Dashboard/>
    },
      ]  
    }
])
export default router;