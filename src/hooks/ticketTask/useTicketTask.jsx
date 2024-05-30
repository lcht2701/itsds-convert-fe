import { useState, useEffect } from "react";
import TicketTaskService from "@/servers/TicketTaskService";

const useTicketTask = (ticketId, id) => {
  const [loading, setLoading] = useState(!!id);
  const [ticketTask, setTicketTask] = useState(null);

  const fetchTicketTask = async () => {
    setLoading(true);
    try {
      const response = await TicketTaskService.getDetail(ticketId, id);
      setTicketTask(response.result);
    } catch (error) {
      console.error("Error fetching ticket task:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTicketTask = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      await TicketTaskService.add(ticketId, data);
    } catch (error) {
      console.error("Add failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketTask = async (data) => {
    console.log(data);
    try {
      await TicketTaskService.update(ticketId, id, data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const updateTicketTaskStatus = async () => {
    console.log(data);
    try {
      await TicketTaskService.updateStatus(ticketId, id);
    } catch (error) {
      console.error("Update ticket task status failed:", error);
    }
  };

  const deleteTicketTaskStatus = async () => {
    console.log(data);
    try {
      await TicketTaskService.delete(ticketId, id);
    } catch (error) {
      console.error("Update ticket task status failed:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTicketTask();
    }
  }, [id]);

  return {
    ticketTask,
    loading,
    addTicketTask,
    updateTicketTask,
    updateTicketTaskStatus,
    deleteTicketTaskStatus,
  };
};

export default useTicketTask;
