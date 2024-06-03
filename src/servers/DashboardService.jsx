import apiClient from "./ApiClient";

class DashboardService {
  async getCustomerService(userId) {
    try {
      const response = await apiClient.get(`/api/dashboard/customer/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get customer dashboard:", error);
    }
  }

  async getCompanyAdminService(userId) {
    try {
      const response = await apiClient.get(
        `/api/dashboard/company-admin/${userId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get company admin dashboard:", error);
    }
  }
  async getTechnicianService(userId) {
    try {
      const response = await apiClient.get(
        `/api/dashboard/technician/${userId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get technician dashboard:", error);
    }
  }
  async getManagerService() {
    try {
      const response = await apiClient.get(`/api/dashboard/manager`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get manager dashboard:", error);
    }
  }
}

export default new DashboardService();
