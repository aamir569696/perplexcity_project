import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashbord from "../features/chat/pages/Dashbord";
import protected from "../features/auth/components/protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forget",
    element: <h1> forget page</h1>,
  },
  {
    path: "/dashboard",
    element: (
      <protected>
        <Dashbord />
      </protected>
    ),
  },
]);

export default router;
