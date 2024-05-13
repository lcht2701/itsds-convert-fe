import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  withXSRFToken: true,
});

apiClient.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (err) {
      console.error(err);
    }
    throw error;
  }
);

export default apiClient;
