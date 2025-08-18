"use client";

import React, { useState, type ChangeEvent } from "react";

type OdsImagesProps = {
  id: string | number;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  imageAlt?: string;
};

const ODS_DESCRIPTIONS: Record<number, string> = {
  1: "Erradicação da Pobreza",
  2: "Fome Zero e Agricultura Sustentável",
  3: "Saúde e bem-estar",
  4: "Educação de qualidade",
  5: "Igualdade de gênero",
  6: "Água potável e saneamento",
  7: "Energia limpa e acessível",
  8: "Trabalho decente e crescimento econômico",
  9: "Indústria, inovação e infraestrutura",
  10: "Redução das desigualdades",
  11: "Cidades e comunidades sustentáveis",
  12: "Consumo e produção responsáveis",
  13: "Ação contra a mudança global do clima",
  14: "Vida na água",
  15: "Vida na terrestre",
  16: "Paz, justiça e instituições eficazes",
  17: "Parcerias e Meios de Implementação",
};

const OdsImages: React.FC<OdsImagesProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  required = false,
  disabled = false,
  className = "",
  imageUrl,
  imageAlt,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const alt = imageAlt ?? `ODS ${id}`;
  const desc = ODS_DESCRIPTIONS[Number(id)] ?? "";

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative">
        <div className="absolute -top-2 -right-2">
          <input
            id={String(id)}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={alt}
              className={`h-20 w-20 object-contain ${
                disabled ? "opacity-50" : ""
              }`}
            />
          </div>

          {label && (
            <label
              htmlFor={String(id)}
              className={`mt-1 text-sm text-center ${
                disabled ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
        </div>
      </div>

      {showTooltip && !disabled && (
        <div
          className="fixed bg-white p-3 rounded-lg shadow-xl border border-gray-200 z-50 max-w-xs pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y + 15}px`,
          }}
        >
          <h3 className="font-bold text-blue-600 text-sm">ODS {id}</h3>
          <p className="text-xs text-gray-600">{desc}</p>
        </div>
      )}
    </div>
  );
};

export default OdsImages;
