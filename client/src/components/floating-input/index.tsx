import React, { useEffect, useRef } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options?: string[];
  error?: string | null;
  type?: string;
  placeholder?: string;
  labelBgColor?: string;
};

export default function FloatingInput({
  label,
  value,
  onChange,
  options,
  error,
  type = "text",
  placeholder = "",
  labelBgColor,
}: Props) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpenRef.current && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const borderClass = (() => {
    if (isFocused) return "border-2 border-[#009FE3]";
    if (error) return "border-2 border-red-500";
    return "border-[1.5px] border-gray-300";
  })();

  const hoverClass = !isFocused && !error ? "hover:border-gray-900" : "";

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setIsFocused(false);
  };

  const labelColor = (() => {
    if (isFocused && !error) return "#009FE3";
    if (error && !isFocused) return "#DC2626";
    if (isFocused && error) return "#009FE3";
    if (isHovered && !isFocused && !error) return "#0F0F0F";
    return "#A0A0A0";
  })();

  return (
    <div
      className="relative pt-2 w-full"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label flutuante */}
      <label
        className="absolute left-4 px-1 z-10 text-xs top-0 pointer-events-none"
        style={{
          backgroundColor: labelBgColor || "#FFFFFF",
          color: labelColor,
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: "140%",
          transition: "color 0.2s, font-weight 0.2s",
        }}
      >
        {label}
      </label>

      {options ? (
        <div
          tabIndex={0}
          className={`relative flex justify-between items-center px-4 py-2 text-base rounded-sm bg-white cursor-pointer h-[48px] transition-colors ${borderClass} ${hoverClass}`}
          onClick={() => setIsOpen((prev) => !prev)}
          onFocus={() => setIsFocused(true)}
        >
          <span className={value ? "text-gray-700" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isFocused ? "#009FE3" : "#898B8F"}
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>

          {isOpen && (
            <div
              className="absolute top-full z-20 bg-white border border-gray-900 rounded-sm mt-1 overflow-hidden
                         left-1/2 -translate-x-1/2 w-[calc(100%)]"
            >
              {options.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                  tabIndex={0}
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
          className={`block w-full px-4 py-2 text-base text-gray-700 rounded-sm
            outline-none focus:outline-none ring-0 focus:ring-0 h-[48px] transition-colors
            ${borderClass} ${hoverClass}`}
          placeholder={placeholder}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
