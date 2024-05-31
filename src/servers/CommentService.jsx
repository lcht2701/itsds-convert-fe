import { toast } from "@/components/ui/use-toast";
import apiClient from "./ApiClient";

class CommentService {
  async get(solutionId) {
    try {
      const response = await apiClient.get(
        `/api/ticket-solution/${solutionId}/comment`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get list process:", error);
    }
  }

  async add(solutionId, data) {
    try {
      const response = await apiClient.post(
        `/api/ticket-solution/${solutionId}/comment`,
        data
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

  async getDetail(solutionId, commentId) {
    try {
      const response = await apiClient.get(
        `/api/ticket-solution/${solutionId}/comment/${commentId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error during the get detail process:", error);
    }
  }

  async update(solutionId, commentId, data) {
    try {
      const response = await apiClient.put(
        `/api/ticket-solution/${solutionId}/comment/${commentId}`,
        data
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

  async delete(solutionId, commentId) {
    try {
      const response = await apiClient.delete(
        `/api/ticket-solution/${solutionId}/comment/${commentId}`
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
}

export default new CommentService();
