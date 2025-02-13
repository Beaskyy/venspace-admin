import { useEffect, useState } from "react";
import axios from "axios";

const useAuthToken = () => {
  const [newToken, setNewToken] = useState(null);
  const [expiryTime, setExpiryTime] = useState(3600);
  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          token: newToken,
        }
      );

      if (response.data?.status === "success") {
        const updateToken = response.data.data.access_token;
        setNewToken(updateToken); // Update the token state
        setExpiryTime(3600); // Reset expiry time (or get it from the response if provided)
        console.log("Token refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    if (newToken) {
      // Set up interval for token refresh
      const interval = setInterval(() => {
        refreshToken();
      }, expiryTime * 1000 - 5000); // Refresh 5 seconds before expiry

      return () => clearInterval(interval); // Clear interval on cleanup
    }
  }, [newToken, expiryTime]);

  return [newToken, setNewToken];
};

export default useAuthToken;
