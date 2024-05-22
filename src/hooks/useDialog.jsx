import { useState } from "react";

const useDialog = () => {
  const [activeDialogId, setActiveDialogId] = useState(null);

  const handleCloseDialog = () => {
    setActiveDialogId(null);
  };

  const handleOpenDialog = (id) => {
    setActiveDialogId(id);
  };

  return {
    activeDialogId,
    handleCloseDialog,
    handleOpenDialog,
  };
};

export default useDialog;
