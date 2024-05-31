import { Button } from "@/components/ui/button";
import useDialog from "@/hooks/useDialog";
import React from "react";
import useTicket from "@/hooks/ticket/useTicket";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";

const CancelTicketButton = ({ ticketId, onReload, isShow }) => {
  const { cancelTicket } = useTicket(ticketId);
  const { dialog, openDialog, closeDialog } = useDialog();

  const onCancelTicket = () => {
    cancelTicket();
    onReload();
  };

  return (
    <>
      {isShow && (
        <Button
          type="button"
          size="sm"
          className="bg-red-500 text-white"
          onClick={() => openDialog(ticketId)}
        >
          Cancel Ticket
        </Button>
      )}
      <ConfirmDialog
        content="Are you sure to cancel this ticket?"
        isOpen={dialog !== null}
        onCancel={() => closeDialog()}
        onConfirm={() => onCancelTicket()}
      />
    </>
  );
};

export default CancelTicketButton;
