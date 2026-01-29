
import axios from "axios";
 
import { refreshApi } from "./auth.api";
import { clearAuth, getAuthToken, setAuthToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://todo-backend-k6oa.onrender.com/",
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = getAuthToken();  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  
  }
  return config;
});

api.interceptors.response.use(
  (res) => res, 
  async (error) => {
    const originalRequest = error.config;

if(originalRequest.url?.includes("/login")||originalRequest.url?.includes("/refresh")){
  return Promise.reject(error);
}

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshApi();
        const newAccessToken = response.data.accessToken;
        setAuthToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
        clearAuth();  
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
