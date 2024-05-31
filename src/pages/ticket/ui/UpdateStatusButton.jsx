import { Button } from "@/components/ui/button";
import useTicket from "@/hooks/ticket/useTicket";
import { TicketStatusToEnum, UserRoleToEnum } from "@/utils/EnumObject";
import React, { useEffect } from "react";
import { useState } from "react";

const UpdateStatusButton = ({ ticketId, onReload, isShow }) => {
  const { ticket, updateTicketStatus } = useTicket(ticketId);
  const [btnName, setBtnName] = useState("");

  useEffect(() => {
    if (ticket && ticket.status !== undefined && ticket.status !== null)
      switch (ticket.status) {
        case TicketStatusToEnum.ASSIGNED:
          setBtnName("Start Progressing Ticket");
          break;
        case TicketStatusToEnum.INPROGRESS:
          setBtnName("Resolved Ticket");
          break;
        case TicketStatusToEnum.RESOLVED:
          setBtnName("Close Ticket");
          break;
        case TicketStatusToEnum.CLOSED:
          break;
        case TicketStatusToEnum.CANCELLED:
          break;
      }
  }, [ticket]);

  const handleUpdateStatus = () => {
    updateTicketStatus();
    onReload();
  };

  return (
    <>
      {isShow && (
        <Button
          type="button"
          size="sm"
          className="bg-gray-400 text-white"
          onClick={() => handleUpdateStatus()}
        >
          {btnName || "Loading..."}
        </Button>
      )}
    </>
  );
};

export default UpdateStatusButton;
