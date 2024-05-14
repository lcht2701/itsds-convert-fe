import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class AuthService {
  async login(data) {
    try {
      const csrfResponse = await apiClient.get("/sanctum/csrf-cookie");
      if (csrfResponse.status !== 204) {
        throw new Error("Failed to retrieve CSRF token");
      }
      const loginResponse = await apiClient.post("/login", {
        email: data.email,
        password: data.password,
      });
      console.log(loginResponse);
      toast({
        title: "Successful",
        description: `${loginResponse.data.message}`,
      });
      return loginResponse.data;
    } catch (error) {
      console.error("Error during the login process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }

  async logout() {
    try {
      const response = await apiClient.post("/logout");
      console.log(response);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
      });
    } catch (error) {
      console.error("Error during the login process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }
}

export default new AuthService();
