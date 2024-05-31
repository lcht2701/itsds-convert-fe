import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class CompanyMemberService {
  async getSelectList(companyId) {
    try {
      const response = await apiClient.get(
        `/api/company/${companyId}/member/select`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get select list process:", error);
    }
  }

  async getPaginatedList(companyId, page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(`/api/company/${companyId}/member`, {
        params: params,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(companyId, data) {
    try {
      const response = await apiClient.post(
        `/api/company/${companyId}/member`,
        data
      );
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data?.message}`,
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

  async getDetail(companyId, memberId) {
    try {
      const response = await apiClient.get(
        `/api/company/${companyId}/member/${memberId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(companyId, memberId, data) {
    try {
      const response = await apiClient.put(
        `/api/company/${companyId}/member/${memberId}`,
        data
      );
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data?.message}`,
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

  async delete(companyId, memberId) {
    try {
      const response = await apiClient.delete(
        `/api/company/${companyId}/member/${memberId}`
      );
      console.log(response.data);
      toast({
        title: "Successful",
        description: `${response.data?.message}`,
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

export default new CompanyMemberService();
