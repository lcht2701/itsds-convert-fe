import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class TicketService {
  async getAvailableServices(userId) {
    try {
      const response = await apiClient.get(
        `/api/ticket/available-service/${userId}`
      );
      console.log("Get Available Services List", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error during the get available services list process:",
        error
      );
    }
  }

  async getPaginatedList(page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(`/api/ticket`, {
        params: params,
      });
      console.log("Get Ticket List", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(data) {
    try {
      const response = await apiClient.post(`/api/ticket`, data);
      console.log("Add Ticket Successfully", response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
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

  async addByCustomer(data) {
    try {
      const response = await apiClient.post(`/api/ticket/customer`, data);
      console.log("Add Ticket By Customer Successfully", response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
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
      const response = await apiClient.get(`/api/ticket/${id}`);
      console.log("Get Ticket Detail", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(id, data) {
    try {
      const response = await apiClient.put(`/api/ticket/${id}`, data);
      console.log("Update Ticket Successfully", response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
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

  async updateByCustomer(id, data) {
    try {
      const response = await apiClient.put(`/api/ticket/${id}/customer`, data);
      console.log("Update Ticket By Customer Successfully", response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
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
      const response = await apiClient.delete(`/api/ticket/${id}`);
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

  async updateStatus(id) {
    try {
      const response = await apiClient.delete(
        `/api/ticket/${id}/update-status`
      );
      console.log("Update ticket status", response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
      });
      return response.data;
    } catch (error) {
      console.error("Error during the update status process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }

  async cancelTicketByCustomer(id) {
    try {
      const response = await apiClient.delete(
        `/api/ticket/${id}/customer-cancel`
      );
      console.log("Cancel ticket", response.data);
      toast({
        title: "Successful",
        description: `${response.data.message}`,
      });
      return response.data;
    } catch (error) {
      console.error("Error during the cancel ticket process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }
}

export default new TicketService();
