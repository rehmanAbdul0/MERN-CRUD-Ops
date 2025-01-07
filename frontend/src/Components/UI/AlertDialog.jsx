import React, { useState, createContext, useContext } from 'react';

const AlertDialogContext = createContext();

export const AlertDialog = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = {
    open,
    setOpen,
  };

  return (
    <AlertDialogContext.Provider value={value}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = () => useContext(AlertDialogContext);