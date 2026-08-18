import { RouterProvider } from "react-router";
import router from "./app.router";
import { useAuth } from "../features/auth/hook/useauth";
import { useEffect } from "react";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      auth.handleGetMe();
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;