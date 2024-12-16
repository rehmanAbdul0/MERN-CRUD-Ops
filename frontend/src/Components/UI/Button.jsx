// components/ui/button.jsx
import React from 'react';
import { clsx } from 'clsx';

const Button = React.forwardRef(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantStyles = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
      // Add more variants as needed
    };
    
    const sizeStyles = {
      sm: 'px-2.5 py-1.5',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
    };
    
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };