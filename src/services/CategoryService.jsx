import apiClient from "./ApiClient";

class CategoryService {
  async getList(page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get("/api/category", { params: params });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
      throw error;
    }
  }

  async delete(entity) {
    try {
      const response = await apiClient.delete(`/api/category/${entity.id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error during the delete process:", error);
      throw error;
    }
  }
}

export default new CategoryService();
