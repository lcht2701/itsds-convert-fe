import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class ContractServiceService {
  async getSelectList(contractId) {
    try {
      const response = await apiClient.get(
        `/api/contract/${contractId}/service/select`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get select list process:", error);
    }
  }

  async getPaginatedList(contractId, page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(
        `/api/contract/${contractId}/service`,
        { params: params }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(contractId, data) {
    try {
      const response = await apiClient.post(
        `/api/contract/${contractId}/service`,
        data
      );
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

  async getDetail(contractId, id) {
    try {
      const response = await apiClient.get(
        `/api/contract/${contractId}/service/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(contractId, id, data) {
    try {
      const response = await apiClient.put(
        `/api/contract/${contractId}/service/${id}`,
        data
      );
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

  async delete(contractId, id) {
    try {
      const response = await apiClient.delete(
        `/api/contract/${contractId}/service/${id}`
      );
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

export default new ContractServiceService();
