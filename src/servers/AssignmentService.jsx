import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class AssignmentService {
  async getPaginatedList(ticketId) {
    try {
      const response = await apiClient.get(
        `/api/ticket/${ticketId}/assign/technicians`
      );
      console.log("Get Technicians List", response.data);
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
      console.error("Error during the add process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    }
  }

  async getDetail(ticketId) {
    try {
      const response = await apiClient.get(`/api/ticket/${ticketId}/assign`);
      console.log("Get Ticket Task Detail", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async delete(ticketId, id) {
    try {
      const response = await apiClient.delete(
        `/api/ticket/${ticketId}/assign/${id}`
      );
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

export default new AssignmentService();
