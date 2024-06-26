import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  withXSRFToken: true,
});

apiClient.defaults.headers.common["Accept"] = "application/json";

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
      if (response && response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (err) {
      console.error(err);
    }
  }
);

export default apiClient;
