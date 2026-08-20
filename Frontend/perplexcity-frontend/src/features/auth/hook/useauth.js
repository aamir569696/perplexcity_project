import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

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

  
  // REGISTER
 
  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true));

      const data = await registerUser({
        username,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", data);

      return true;

    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      dispatch(setError(errorMessage));

      toast.error(errorMessage);

      return false;

    } finally {
      dispatch(setLoading(false));
    }
  }

  
  // LOGIN

async function handleLogin(email, password) {
  try {
    dispatch(setLoading(true));

    const data = await loginUser({
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", data);

    // Purane user ki chats clear
    dispatch(resetChat());

    // Token save
    localStorage.setItem("token", data.token);

    // User Redux mein save
    dispatch(setUser(data.user));

    // Success popup
    toast.success("Login successful!");

    return true;

  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data);

    localStorage.removeItem("token");

    dispatch(setUser(null));

    const errorMessage =
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";

    dispatch(setError(errorMessage));

    // Backend ka message popup mein show hoga
    toast.error(errorMessage);

    return false;

  } finally {
    dispatch(setLoading(false));
  }
}

  
  // GET ME
 
  async function handleGetMe() {
    try {
      dispatch(setLoading(true));

      const data = await getMeUser();

      console.log("GET ME RESPONSE:", data);

      dispatch(setUser(data.user));

      return true;

    } catch (error) {
      console.log("GET ME ERROR:", error.response?.data);

      // Invalid token
      localStorage.removeItem("token");

      // Authentication clear
      dispatch(setUser(null));

      const errorMessage =
        error.response?.data?.message ||
        "Session expired. Please login again.";

      dispatch(setError(errorMessage));

      // GetMe usually background mein hota hai,
      // isliye toast optional rakha ja sakta hai.
      toast.error(errorMessage);

      return false;

    } finally {
      dispatch(setLoading(false));
    }
  }

  
  // LOGOUT
  
  async function handleLogout() {
    try {
      dispatch(setLoading(true));

      await logoutUser();

      localStorage.removeItem("token");

      dispatch(setUser(null));

      return true;

    } catch (error) {
      console.log("LOGOUT ERROR:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        "Logout failed. Please try again.";

      dispatch(setError(errorMessage));

      toast.error(errorMessage);

      return false;

    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
}