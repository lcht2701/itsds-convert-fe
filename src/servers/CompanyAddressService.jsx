import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class CompanyAddressService {
  async getSelectList() {
    try {
      const response = await apiClient.get(`/api/company/select`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get select list process:", error);
    }
  }

  async get(companyId, page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(
        `/api/company/${companyId}/address`,
        {
          params: params,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(companyId, data) {
    try {
      const response = await apiClient.post(
        `/api/company/${companyId}/address`,
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

  async getDetail(companyId, addressId) {
    try {
      const response = await apiClient.get(
        `/api/company/${companyId}/address/${addressId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(companyId, addressId, data) {
    try {
      const response = await apiClient.put(
        `/api/company/${companyId}/address/${addressId}`,
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

  async delete(companyId, addressId) {
    try {
      const response = await apiClient.delete(
        `/api/company/${companyId}/address/${addressId}`
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

export default new CompanyAddressService();
