import { useState, useCallback } from "react";
import TicketService from "@/servers/TicketService";

const useTicketList = (currentPage) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTicketList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await TicketService.getPaginatedList(currentPage);
      setTickets(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    tickets,
    loading,
    fetchTicketList,
  };
};

export default useTicketList;
