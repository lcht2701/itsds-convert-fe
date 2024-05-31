import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class TicketTaskService {
  async getPaginatedList(ticketId, page = 1) {
    try {
      const params = { page: page };
      const response = await apiClient.get(
        `/api/ticket/${ticketId}/ticket-task`,
        {
          params: params,
        }
      );
      console.log("Get Ticket Task List", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(ticketId, data) {
    try {
      const response = await apiClient.post(
        `/api/ticket/${ticketId}/ticket-task`,
        data
      );
      console.log("Add Ticket Task Successfully", response.data);
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

  async getDetail(ticketId, id) {
    try {
      const response = await apiClient.get(
        `/api/ticket/${ticketId}/ticket-task/${id}`
      );
      console.log("Get Ticket Task Detail", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(ticketId, id, data) {
    try {
      const response = await apiClient.put(
        `/api/ticket/${ticketId}/ticket-task/${id}`,
        data
      );
      console.log("Update Ticket Task Successfully", response.data);
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

  async delete(ticketId, id) {
    try {
      const response = await apiClient.delete(
        `/api/ticket/${ticketId}/ticket-task/${id}`
      );
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

  async updateStatus(ticketId, id, data) {
    try {
      const response = await apiClient.delete(
        `/api/ticket/${ticketId}/ticket-task/${id}`,
        data
      );
      console.log("Update ticket task status", response.data);
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

export default new TicketTaskService();
