// components/ui/label.jsx
import React from 'react';
import { clsx } from 'clsx';

const Label = React.forwardRef(
  (
    {
      className,
      htmlFor,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <label
        htmlFor={htmlFor}
        ref={ref}
        className={clsx(
          'block text-sm font-medium text-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };