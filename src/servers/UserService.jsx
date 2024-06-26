import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class UserService {
  async getOwnerList() {
    try {
      const response = await apiClient.get(`/api/user/owner/select`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get owner list process:", error);
    }
  }

  async getRequesterList() {
    try {
      const response = await apiClient.get(`/api/user/requester/select`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get requester list process:", error);
    }
  }

  async getProfile() {
    try {
      const response = await apiClient.get(`/api/user/profile`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get user profile process:", error);
    }
  }

  async updateProfile(data) {
    try {
      const response = await apiClient.put(`api/user/profile`, data);
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

  // async getPaginatedList(page = 1) {
  //   try {
  //     const params = { page: page };
  //     const response = await apiClient.get(`/api/service`, { params: params });
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during the get list process:", error);
  //   }
  // }

  // async add(data) {
  //   try {
  //     const response = await apiClient.post(`/api/service`, data);
  //     console.log(response.data);
  //     toast({
  //       title: "Successful",
  //       description: `${response.data.message}`,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during the add process:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: `${error.response?.data?.message}`
  //     });
  //   }
  // }

  // async getDetail(id) {
  //   try {
  //     const response = await apiClient.get(`/api/service/${id}`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during the get detail process:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: `${error.response?.data?.message}`
  //     });
  //   }
  // }

  // async update(id, data) {
  //   try {
  //     const response = await apiClient.put(`/api/service/${id}`, data);
  //     console.log(response.data);
  //     toast({
  //       title: "Successful",
  //       description: `${response.data.message}`,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during the update process:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: `${error.response?.data?.message}`
  //     });
  //   }
  // }

  // async delete(id) {
  //   try {
  //     const response = await apiClient.delete(`/api/service/${id}`);
  //     console.log(response.data);
  //     toast({
  //       title: "Successful",
  //       description: `${response.data.message}`,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during the delete process:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: `${error.response?.data?.message}`
  //     });
  //   }
  // }
}

export default new UserService();
