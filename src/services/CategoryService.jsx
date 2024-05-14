import { toast } from "@/components/ui/use-toast";
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
      console.error("Error during the get list process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }

  async getDetail(id) {
    try {
      const response = await apiClient.get(`/api/category/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
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
      console.error("Error during the get list process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
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
      console.error("Error during the delete process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }
}

export default new CategoryService();
