import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class CategoryService {
  async getSelectList() {
    try {
      const response = await apiClient.get(`/api/category/select`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get select list process:", error);
    }
  }

  async getPaginatedList(page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(`/api/category`, { params: params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(data) {
    try {
      const response = await apiClient.post(`/api/category`, data);
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: `${errorMessage}`,
      });
    }
  }

  async getDetail(id) {
    try {
      const response = await apiClient.get(`/api/category/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(id, data) {
    try {
      const response = await apiClient.put(`/api/category/${id}`, data);
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: `${errorMessage}`,
      });
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/api/category/${id}`);
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: `${errorMessage}`,
      });
    }
  }
}

export default new CategoryService();
