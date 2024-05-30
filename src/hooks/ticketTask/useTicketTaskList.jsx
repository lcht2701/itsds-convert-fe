import { useState, useCallback } from "react";
import TicketTaskService from "@/servers/TicketTaskService";

const useTicketTaskList = (ticketId, currentPage) => {
  const [ticketTasks, setTicketTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTicketTaskList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await TicketTaskService.getPaginatedList(
        ticketId,
        currentPage
      );
      setTicketTasks(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    ticketTasks,
    loading,
    fetchTicketTaskList,
  };
};

export default useTicketTaskList;
