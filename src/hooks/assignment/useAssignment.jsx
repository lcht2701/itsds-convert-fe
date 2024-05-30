import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentService from "@/servers/AssignmentService";

const useAssignment = (ticketId) => {
  const [assignment, setAssignment] = useState(null);
  const navigate = useNavigate();

  const fetchAssignment = async () => {
    try {
      const response = await AssignmentService.getDetail(ticketId);
      setAssignment(response.result);
    } catch (error) {
      console.error("Error fetching assignment:", error);
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
    addAssignment,
  };
};

export default useAssignment;
