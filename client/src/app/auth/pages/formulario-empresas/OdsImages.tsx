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
  3: "Saúde e Bem-Estar",
  4: "Educação de Qualidade",
  5: "Igualdade de Gênero",
  6: "Água Potável e Saneamento",
  7: "Energia Limpa e Acessível",
  8: "Trabalho Decente e Crescimento Econômico",
  9: "Indústria, Inovação e Infraestrutura",
  10: "Redução das Desigualdades",
  11: "Cidades e Comunidades Sustentáveis",
  12: "Consumo e Produção Responsáveis",
  13: "Ação Contra a Mudança Global do Clima",
  14: "Vida na Água",
  15: "Vida Terrestre",
  16: "Paz, Justiça e Instituições Eficazes",
  17: "Parcerias e Meios de Implementação",
};

const OdsImages: React.FC<OdsImagesProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  required,
  disabled,
  className,
  imageUrl,
  imageAlt = `ODS ${id}`,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const desc = ODS_DESCRIPTIONS[Number(id)] ?? "";

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      <label
        htmlFor={String(id)}
        className="relative flex flex-col items-center cursor-pointer"
      >
        {/*
          Div que contém o checkbox.
          Ele está posicionado de forma absoluta em relação à <label>
        */}
        <div className="absolute -top-1 -left-6 z-10">
          <input
            id={String(id)}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`h-4 w-4 rounded border-[#1474FF] text-blue-600 focus:ring-blue-500 ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </div>

        {/* Imagem e label */}
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`h-25 w-25 object-contain ${disabled ? "opacity-50" : ""}`}
          />
        </div>

        {label && (
          <p
            className={`mt-1 text-sm text-center ${
              disabled ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </p>
        )}
      </label>

      {/* Tooltip ... (código permanece o mesmo) */}
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