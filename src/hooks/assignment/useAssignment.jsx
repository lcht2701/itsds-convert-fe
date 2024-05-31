import { useState, useEffect } from "react";
import AssignmentService from "@/servers/AssignmentService";

const useAssignment = (ticketId) => {
  const [assignment, setAssignment] = useState(null);
  const [technicians, setTechnicians] = useState([]);

  const fetchAssignment = async () => {
    try {
      const response = await AssignmentService.getDetail(ticketId);
      setAssignment(response.result);
    } catch (error) {
      console.error("Error fetching assignment:", error);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await AssignmentService.getTechnicians(ticketId);
      setTechnicians(response.result);
    } catch (error) {
      console.error("Error fetching technicians:", error);
    }
  };

  const addAssignment = async (data) => {
    console.log(data);
    try {
      await AssignmentService.add(ticketId, data);
      // navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchAssignment();
    }
  }, [ticketId]);

  return {
    assignment,
    technicians,
    fetchAssignment,
    fetchTechnicians,
    addAssignment,
  };
};

export default useAssignment;
