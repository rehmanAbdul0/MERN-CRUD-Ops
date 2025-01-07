import React from 'react';
import { useAlertDialog } from './AlertDialog';

export const AlertDialogTrigger = ({ children, asChild }) => {
  const { setOpen } = useAlertDialog();

  const handleClick = () => setOpen(true);

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return <button onClick={handleClick}>{children}</button>;
};