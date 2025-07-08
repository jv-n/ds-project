import React from "react";

const OdsImages = ({
  id,
  name,
  label,
  checked,
  onChange,
  required,
  disabled,
  className,
  imageUrl,
  imageAlt = "Ícone",
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="mr-3 flex-shrink-0">
        <img src={imageUrl} alt={imageAlt} className="h-13 w-13 object-cover" />
      </div>

      <div className="flex items-center">
        <div className="flex items-center h-5">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            required={required}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor={id}
            className={`font-medium ${
              disabled ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      </div>
    </div>
  );
};

export default OdsImages;
