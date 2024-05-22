import { useState, useCallback } from "react";
import TicketSolutionService from "@/servers/TicketSolutionService";

const useTicketSolutionList = (currentPage) => {
  const [ticketSolutions, setTicketSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTicketSolutionList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await TicketSolutionService.getPaginatedList(
        currentPage
      );
      setTicketSolutions(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    ticketSolutions,
    loading,
    fetchTicketSolutionList,
  };
};

export default useTicketSolutionList;
