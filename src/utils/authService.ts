import axios from "axios";

const handleTokenRequest = async (): Promise<boolean> => {
  const apartmentToken = localStorage.getItem("accessToken");
  const apartmentRefreshToken = localStorage.getItem("refreshToken");

  if (!apartmentToken || !apartmentRefreshToken) return false;

  try {
    // Check if the access token is still valid
    await axios.post("http://localhost:3000/auth/check-token", {
      token: apartmentToken,
    });

    return true;
  } catch (error) {
    // Access token is expired, try to refresh
    try {
      const response = await axios.post("YOUR_SERVER_REFRESH_TOKEN_ENDPOINT", {
        refreshToken: apartmentRefreshToken,
      });

      // Update tokens in local storage
      localStorage.setItem("apartmentAccessToken", response.data.token);
      localStorage.setItem("apartmentRefreshToken", response.data.refreshToken);

      return true;
    } catch (refreshError) {
      // Refresh failed, perform logout
      logout();
      return false;
    }
  }
};

const logout = (): void => {
  const apartmentRefreshToken = localStorage.getItem("apartmentRefreshToken");

  // Perform server-side logout, remove tokens from local storage
  axios.post("YOUR_SERVER_LOGOUT_ENDPOINT", {
    refreshToken: apartmentRefreshToken,
  });

  localStorage.removeItem("apartmentAccessToken");
  localStorage.removeItem("apartmentRefreshToken");
};

export { handleTokenRequest, logout };
