import { useDispatch } from "react-redux";
import {
  registerUser,
  loginUser,
  getMeUser,
  logoutUser,
} from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import { resetChat } from "../../chat/chat.slice";
export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true));

      const data = await registerUser({
        username,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", data);

      // Register ke baad user ko login NAHI karna
      // Token save NAHI karna
      // Redux user set NAHI karna

      return true;
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);

      dispatch(setError(error.response?.data?.message || "Register failed"));

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin(email, password) {
    try {
      dispatch(setLoading(true));
      // Purane user ki chats clear
      dispatch(resetChat());
      const data = await loginUser({ email, password });

      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem("token", data.token);

      // Sirf actual user Redux mein save hoga
      dispatch(setUser(data.user));

      return true;
    } catch (error) {
      localStorage.removeItem("token");

      dispatch(setUser(null));

      dispatch(setError(error.response?.data?.message || "Login failed"));

      console.log(error);

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));

      const data = await getMeUser();

      console.log("GET ME RESPONSE:", data);

      // Backend response:
      // { message, success, user }
      dispatch(setUser(data.user));

      return true;
    } catch (error) {
      console.log("GET ME ERROR:", error.response?.data);

      // Token invalid/missing ho to local token bhi remove
      localStorage.removeItem("token");

      // Redux authentication clear
      dispatch(setUser(null));

      dispatch(setError(error.response?.data?.message || "GetMe failed"));

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout(params) {
    try {
      dispatch(setLoading(ture));
      await logoutUser();
      localStorage.removeItem("token");
      dispatch(setUser(null));
      return true;

    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Logout failed"));
      return false;

    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout
  };
}
