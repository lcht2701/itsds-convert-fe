import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class ContractService {
  // async getSelectList() {
  //   try {
  //     const response = await apiClient.get(`/api/contract/select`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during the get select list process:", error);
  //   }
  // }

  async getPaginatedList(page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(`/api/contract`, { params: params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(data) {
    try {
      const response = await apiClient.post(`/api/contract`, data);
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data?.message}`,
      });
      return response.data;
    } catch (error) {
      console.error("Error during the add process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }

  async getDetail(id) {
    try {
      const response = await apiClient.get(`/api/contract/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(id, data) {
    try {
      const response = await apiClient.put(`/api/contract/${id}`, data);
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data?.message}`,
      });
      return response.data;
    } catch (error) {
      console.error("Error during the update process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/api/contract/${id}`);
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data?.message}`,
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

export default new ContractService();
