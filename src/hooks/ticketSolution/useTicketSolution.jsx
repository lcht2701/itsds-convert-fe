import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketSolutionService from "@/servers/TicketSolutionService";

const useTicketSolution = (id) => {
  const [loading, setLoading] = useState(!!id);
  const [ticketSolution, setTicketSolution] = useState(null);
  const navigate = useNavigate();

  const fetchTicketSolution = async () => {
    setLoading(true);
    try {
      const response = await TicketSolutionService.getDetail(id);
      setTicketSolution(response.result);
    } catch (error) {
      console.error("Error fetching ticket solution:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTicketSolution = async (data) => {
    console.log(data);
    try {
      await TicketSolutionService.add(data);
      navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const updateTicketSolution = async (data) => {
    console.log(data);
    try {
      await TicketSolutionService.update(id, data);
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const approve = async () => {
    try {
      await TicketSolutionService.approve(id).then(() => {
        fetchTicketSolution();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const reject = async () => {
    try {
      await TicketSolutionService.reject(id).then(() => {
        fetchTicketSolution();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTicketSolution();
    }
  }, [id]);

  return {
    ticketSolution,
    loading,
    addTicketSolution,
    updateTicketSolution,
    approve,
    reject,
  };
};

export default useTicketSolution;
