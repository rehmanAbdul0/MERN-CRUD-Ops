import React from 'react';
import { useAlertDialog } from './AlertDialog';

export const AlertDialogCancel = ({ children }) => {
  const { setOpen } = useAlertDialog();

  return (
    <button
      onClick={() => setOpen(false)}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      {children}
    </button>
  );
};