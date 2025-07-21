"use client"
import React, { useState, useEffect } from 'react';

const Input = ({ 
  label, 
  error, 
  mask,
  type = 'text',
  className = '',
  value,
  ...props 
}) => {
  const [displayValue, setDisplayValue] = useState(value || '');
  const [emailError, setEmailError] = useState(''); 


  useEffect(() => {
    if (mask && value) {
      setDisplayValue(mask(value));
    } else {
      setDisplayValue(value || '');
    }
  }, [value, mask]);

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    if (mask) {
      newValue = newValue.replace(/\D/g, '');
      setDisplayValue(mask(newValue));
    } else {
      setDisplayValue(newValue);
    }

    if (props.onChange) {
      const event = {
        ...e,
        target: {
          ...e.target,
          value: newValue
        }
      };
      props.onChange(event);
    }
  };

  return (
    <div className="w-full px-9">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}*
        </label>
      )}
      <input
        type={type} 
        className={`w-full px-3 py-2 border ${
          (error || emailError) ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
      {(error || emailError) && (
        <p className="mt-1 text-sm text-red-600">{error || emailError}</p>
      )}
    </div>
  );
};

export default Input;