import React from "react";

const Button = ({
  variant = "primary",
  children,
  className = "px-24 py-2 text-base",
  ...props
}) => {
  const baseClasses =
    "py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#294BB6] hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
