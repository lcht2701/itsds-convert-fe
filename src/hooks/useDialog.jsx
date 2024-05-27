import { useState } from "react";

const useDialog = () => {
  const [dialog, setDialog] = useState(null);

  const closeDialog = () => {
    setDialog(null);
  };

  const openDialog = (id) => {
    setDialog(id);
  };

  return {
    dialog,
    closeDialog,
    openDialog,
  };
};

export default useDialog;
