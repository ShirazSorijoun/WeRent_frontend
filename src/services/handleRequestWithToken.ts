import axios from "axios";
import { refreshAccessToken } from "./user-service";

const handleRequestWithToken = async () => {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!token || !refreshToken) return false;

  try {
    await axios.post(`https://10.10.248.166:443/auth/checkToken`, {
      token: token,
    });
    return true;
  } catch (error) {
    try {
      const res = await refreshAccessToken(refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      return true;
    } catch (refreshError) {
      console.error("Error refreshing token:", refreshError);
      await axios.get(`https://10.10.248.166:443/auth/logout`);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
      console.log("User logged out");
      return false;
    }
  }
};

export { handleRequestWithToken };
