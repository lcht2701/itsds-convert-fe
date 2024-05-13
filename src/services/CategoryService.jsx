import apiClient from "./ApiClient";

class CategoryService {
  async getList() {
    try {
      const response = await apiClient.get("/api/category");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error during the login process:", error);
      throw error;
    }
  }
}

export default new CategoryService();
