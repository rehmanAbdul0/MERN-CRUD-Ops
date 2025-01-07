import React from 'react';
import { useAlertDialog } from './AlertDialog';

export const AlertDialogContent = ({ children }) => {
  const { open, setOpen } = useAlertDialog();

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-[50]">
        {children}
      </div>
    </div>
  );
};