import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class ReactionService {
  async get(id) {
    try {
      const response = await apiClient.get(`/api/ticket-solution/${id}/react`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get select list process:", error);
    }
  }

  async like(id) {
    try {
      const response = await apiClient.post(
        `/api/ticket-solution/${id}/react/like`
      );
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

  async dislike(id) {
    try {
      const response = await apiClient.post(
        `/api/ticket-solution/${id}/react/dislike`
      );
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
}

export default new ReactionService();
