import { useState } from "react";

const useDialog = () => {
  const [dialog, setDialog] = useState(null);

  const handleCloseDialog = () => {
    setDialog(null);
  };

  const handleOpenDialog = (id) => {
    setDialog(id);
  };

  return {
    dialog,
    handleCloseDialog,
    handleOpenDialog,
  };
};

export default useDialog;
