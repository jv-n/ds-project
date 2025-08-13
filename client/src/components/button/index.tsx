import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center h-10 px-4 py-1 rounded-[6px] font-medium text-[16px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

const variants = {
  primary:
    'bg-[#007FFF] text-white hover:bg-[#0059B3] focus:ring-[#007FFF] disabled:bg-gray-400',
  secondary:
    'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 focus:ring-[#007FFF] disabled:bg-gray-200 disabled:text-gray-500',
};

export default function Button({
  className = '',
  children,
  variant = 'primary',
  icon,
  ...props
}: ButtonProps) {
  const variantClasses = variants[variant];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
