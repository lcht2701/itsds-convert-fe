import apiClient from "./ApiClient";

class AuthService {
  async login(data) {
    try {
      const csrfResponse = await apiClient.get("/sanctum/csrf-cookie");
      if (csrfResponse.status !== 204) {
        throw new Error("Failed to retrieve CSRF token");
      }

      // Attempt to login
      const loginResponse = await apiClient.post("/login", {
        email: data.email,
        password: data.password,
      });

      console.log(loginResponse);
      return loginResponse.data;
    } catch (error) {
      console.error("Error during the login process:", error);
      throw error; // Rethrowing the error to handle it or log it externally if needed
    }
  }

  async logout() {
    try {
      const response = await apiClient.post("/logout");
      console.log(response);
    } catch (error) {
      console.error("Error during the login process:", error);
      throw error; // Rethrowing the error to handle it or log it externally if needed
    }
  }
}

export default new AuthService();
