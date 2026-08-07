import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashbord from "../features/chat/pages/Dashbord";
import Protected from "../features/auth/components/protected";
import Publicroute from "../features/auth/components/Publicroute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Publicroute>
      <Login />
    </Publicroute>,
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/forget",
    element: <h1> forget page</h1>,
  },
  {
    path: "/dashboard",
    element: 
      <Protected>
        <Dashbord />
      </Protected>
    ,
  },
]);

export default router;
