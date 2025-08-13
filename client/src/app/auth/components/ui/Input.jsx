"use client";
import React from "react";

const Input = ({
  label,
  error,
  mask,
  type = "text",
  className = "",
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e) => {
    let newValue = e.target.value;

    if (mask) {
      newValue = mask(newValue.replace(/\D/g, ""));
    }

    // Chama onChange do pai com o valor formatado
    if (onChange) {
      const event = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
          name: props.name, // Garante que o nome seja passado
        },
      };
      onChange(event);
    }
  };

  return (
    <div className="w-96 px-3 mx-3">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-1">
          {label}*
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
        value={value || ""} // Usa o valor controlado pelo pai
        onChange={handleChange}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
