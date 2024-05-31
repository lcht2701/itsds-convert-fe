import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketService from "@/servers/TicketService";
import UserService from "@/servers/UserService";

const useTicket = (id) => {
  const [loading, setLoading] = useState(!!id);
  const [ticket, setTicket] = useState(null);
  const [requesters, setRequesters] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const navigate = useNavigate();

  const fetchRequesters = async () => {
    try {
      const response = await UserService.getRequesterList();
      setRequesters(response.result);
    } catch (error) {
      console.error("Error fetching requesters:", error);
    }
  };

  const fetchServices = async (requesterId) => {
    try {
      const response = await TicketService.getAvailableServices(requesterId);
      setAvailableServices(response.result);
    } catch (error) {
      console.error("Error fetching available services:", error);
    }
  };

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const response = await TicketService.getDetail(id);
      setTicket(response.result);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTicket = async (data) => {
    console.log(data);
    try {
      await TicketService.add(data);
      navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const addTicketByCustomer = async (data) => {
    console.log(data);
    try {
      await TicketService.addByCustomer(data);
      navigate(-1);
    } catch (error) {
      console.error("Add by customer failed:", error);
    }
  };

  const updateTicket = async (data) => {
    console.log(data);
    try {
      await TicketService.update(id, data);
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const updateTicketByCustomer = async (data) => {
    console.log(data);
    try {
      await TicketService.updateByCustomer(id, data);
      navigate(-1);
    } catch (error) {
      console.error("Update by customer failed:", error);
    }
  };

  const updateTicketStatus = async () => {
    try {
      await TicketService.updateStatus(id);
      // navigate(-1);
    } catch (error) {
      console.error("Update ticket status failed:", error);
    }
  };

  const cancelTicket = async () => {
    try {
      await TicketService.cancelTicketByCustomer(id);
      // navigate(-1);
    } catch (error) {
      console.error("Cancel ticket failed:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTicket();
    }
  }, [id]);

  return {
    ticket,
    availableServices,
    loading,
    requesters,
    fetchTicket,
    fetchRequesters,
    fetchServices,
    addTicket,
    updateTicket,
    addTicketByCustomer,
    updateTicketByCustomer,
    updateTicketStatus,
    cancelTicket,
  };
};

export default useTicket;
