// components/ui/input.jsx
import React from 'react';
import { clsx } from 'clsx';

const Input = React.forwardRef(
  (
    {
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <input
        type={type}
        ref={ref}
        className={clsx(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };