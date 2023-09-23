import { useAuth } from "../Context/AuthContext";
import axios from "../api/axios";
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        foundUser: response.data.foundUser,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
