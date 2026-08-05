import { useDispatch } from "react-redux";
import { registerUser, loginUser, getMeUser } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await registerUser({ username, email, password });
        dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Register faild"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin(email, password) {
    try {
      dispatch(setLoading(true));
      console.log("Before loginUser");
      const data = await loginUser({ email, password });
      console.log('after');
      dispatch(setUser(data));
      return true; // Indicate successful login

    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login faild"));
      console.log(error);
      return false; // Indicate failed login
      
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMeUser();
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "GetMe faild"));
    } finally {
      dispatch(setLoading(false));
    }
  }


  return{

    handleRegister,
    handleLogin,
    handleGetMe
  }
}
