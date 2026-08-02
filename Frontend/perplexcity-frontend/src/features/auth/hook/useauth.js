import { useDispatch } from "react-redux";
import { registerUser, loginUser, getMeUser } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
  const diapatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    try {
      diapatch(setLoading(true));
      const data = await register({ username, email, password });
        diapatch(setUser(data));
    } catch (error) {
      diapatch(setError(error.response?.data?.message || "Register faild"));
    } finally {
      diapatch(setLoading(false));
    }
  }

  async function handleLogin(email, password) {
    try {
      diapatch(setLoading(true));
      const data = await handleLoginUser({ email, password });
      diapatch(setUser(data));
    } catch (error) {
      diapatch(setError(error.response?.data?.message || "Login faild"));
    } finally {
      diapatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      diapatch(setLoading(true));
      const data = await getMeUser();
    } catch (error) {
      diapatch(setError(error.response?.data?.message || "GetMe faild"));
    } finally {
      diapatch(setLoading(false));
    }
  }


  return{
    handleRegister,
    handleLogin,
    handleGetMe
  }
}
