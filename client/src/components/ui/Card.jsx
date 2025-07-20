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

const CardHeader = ({
  title,
  description,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {children}
    </div>
  );
};

const CardContent = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };