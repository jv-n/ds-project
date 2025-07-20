// src/components/ui/Input.jsx
import React, { useState, useEffect } from 'react';

const Input = ({ 
  label, 
  error, 
  mask, // Adicione esta prop
  className = '',
  value,
  ...props 
}) => {
  const [displayValue, setDisplayValue] = useState(value || '');

  useEffect(() => {
    if (mask && value) {
      setDisplayValue(mask(value));
    } else {
      setDisplayValue(value || '');
    }
  }, [value, mask]);

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Se houver máscara, aplica antes de enviar para o componente pai
    if (mask) {
      newValue = newValue.replace(/\D/g, ''); // Remove caracteres não numéricos
      setDisplayValue(mask(newValue));
    } else {
      setDisplayValue(newValue);
    }
    
    // Propaga o valor sem formatação para o componente pai
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
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;