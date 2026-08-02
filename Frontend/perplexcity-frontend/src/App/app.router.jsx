import { createBrowserRouter, Navigate } from 'react-router';
import Login from '../features/auth/pages/login';
import Register from '../features/auth/pages/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path:'/forget',
    element: <h1> forget page</h1>
  },
  {
    path: '/dashboard',
    element: <h1>Dashbord page</h1>
  }
]);

export default router;
