import apiClient from "./ApiClient";

class CategoryService {
  async getList(page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(`/api/category`, { params: params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
      throw error;
    }
  }

  async add(data) {
    try {
      const response = await apiClient.post(`/api/category`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
      throw error;
    }
  }

  async getDetail(id) {
    try {
      const response = await apiClient.get(`/api/category/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await apiClient.put(`/api/category/${id}`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/api/category/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the delete process:", error);
      throw error;
    }
  }
}

export default new CategoryService();
