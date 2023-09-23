import useAxiosPrivate from "./useAxiosPrivate";
import { useAuth } from "../Context/AuthContext";
function useLogOut() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const LOGOUT_URL = "/Logout";
  const LogOut = async () => {
    const response = await axiosPrivate.post(LOGOUT_URL, {
      withCredentials: true,
    });
    setAuth({});
    console.log(response);
    return response;
  };
  return LogOut;
}

export default useLogOut;
