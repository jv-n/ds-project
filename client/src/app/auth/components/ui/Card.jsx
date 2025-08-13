import React from 'react';

const Card = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = "rounded-lg p-6";

  const variants = {
    default: "bg-white border border-gray-200",
    outline: "border border-gray-300",
    elevated: "bg-white shadow-md",
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};


export { Card };