import React from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options?: string[];
  error?: string | null;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: string;
};

export default function FloatingInput({
  label,
  value,
  onChange,
  options,
  error,
  onBlur,
  onFocus,
  type = "text",
}: Props) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const hasValue = value.trim().length > 0;

  const borderColor = error
    ? "border-red-500"
    : isFocused
    ? "border-[#009FE3]"
    : "border-gray-900";

  const hoverClass = !isFocused && !error ? "hover:border-gray-900" : "";

  const currentColor = error
    ? "#DC2626"
    : isFocused || isOpen
    ? "#009FE3"
    : "#898B8F";

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  // Label flutua se houver valor, foco ou dropdown aberto
  const labelFloating = hasValue || isFocused || isOpen;

  return (
    <div className="relative pt-2">
      {/* Label flutuante */}
      <label
        className={`absolute left-4 px-1 bg-white z-10 transition-all duration-200 pointer-events-none
          ${labelFloating ? "text-xs top-0" : "text-base top-[20px]"}`}
        style={{ color: currentColor }}
      >
        {label}
      </label>

      {options ? (
        <div
          tabIndex={0}
          className={`relative flex justify-between items-center px-4 py-2 text-base border-[1.5px] rounded-sm shadow-sm bg-white cursor-pointer h-[48px]
            ${borderColor} ${hoverClass}`}
          onClick={() => setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            // Fecha apenas se o foco sair completamente do dropdown
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsFocused(false);
              setIsOpen(false);
            }
          }}
        >
          <span className={value ? "text-gray-700" : "text-gray-400"}>
            {value || ""}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={currentColor}
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          {isOpen && (
            <div className="absolute top-full left-0 z-20 w-full bg-white border border-gray-900 rounded-sm mt-1 overflow-hidden">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-base"
                  onMouseDown={(e) => e.preventDefault()} // previne blur antes do click
                  onClick={() => handleSelect(option)}
                  tabIndex={0} // permite foco para relatedTarget
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!!error}
          className={`block w-full px-4 py-2 text-base text-gray-700 border-[1.5px] rounded-sm shadow-sm
            outline-none focus:outline-none ring-0 focus:ring-0 placeholder:text-transparent h-[48px] transition-colors
            ${borderColor} ${hoverClass}`}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

