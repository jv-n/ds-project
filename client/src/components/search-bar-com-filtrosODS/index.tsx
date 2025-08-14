"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { lupa } from "@/assets";
import { Filter, ChevronDown, X } from "lucide-react";

/** Opções do dropdown (com numeração só para exibir) */
const listaODS = [
  "1. Erradicação da Pobreza",
  "2. Fome Zero e Agricultura Sustentável",
  "3. Saúde e Bem-estar",
  "4. Educação de Qualidade",
  "5. Igualdade de gênero",
  "6. Água potável e saneamento",
  "7. Energia limpa e acessível",
  "8. Trabalho decente e crescimento econômico",
  "9. Indústria, inovação e infraestrutura",
  "10. Redução das Desigualdades",
  "11. Cidades e comunidades sustentáveis",
  "12. Consumo e produção responsáveis",
  "13. Ação contra a mudança global do clima",
  "14. Vida na água",
  "15. Vida terrestre",
  "16. Paz, justiça e instituições eficazes",
  "17. Parcerias e meios de implementação",
];

const stripPrefix = (s: string) => s.replace(/^\d+\.\s*/, "");

type Props = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  activeOds: string[];
  onAddOds: (odsName: string) => void;
  onRemoveOds: (odsName: string) => void;
  onClearAll?: () => void;
};

export default function SearchbarComFiltrosODS({
  searchText,
  onSearchTextChange,
  activeOds,
  onAddOds,
  onRemoveOds,
  onClearAll,
}: Props) {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number; width: number }>({
    left: 0,
    top: 0,
    width: 320, // ~ w-80
  });

  // Reposiciona o menu quando abre / ao rolar / redimensionar
  useEffect(() => {
    if (!dropdownAberto || !btnRef.current) return;

    const update = () => {
      const r = btnRef.current!.getBoundingClientRect();
      setMenuPos({
        left: Math.round(r.left),
        top: Math.round(r.bottom),
        width: 320,
      });
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [dropdownAberto]);

  // Fecha ao clicar fora — em 'click' e ignorando o menu do portal
  useEffect(() => {
    if (!dropdownAberto) return;

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (btnRef.current && (btnRef.current === target || btnRef.current.contains(target))) ||
        (menuRef.current && (menuRef.current === target || menuRef.current.contains(target)))
      ) {
        return;
      }
      setDropdownAberto(false);
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [dropdownAberto]);

  // Elemento do dropdown via portal
  const dropdownEl =
    dropdownAberto &&
    typeof window !== "undefined" &&
    createPortal(
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          left: menuPos.left,
          top: menuPos.top + 8, // espacinho
          width: menuPos.width,
          zIndex: 9999,
        }}
        className="bg-white border border-[#DBDBDB] rounded-md shadow-lg"
      >
        <ul className="max-h-72 overflow-y-auto">
          {listaODS.map((ods, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => {
                  onAddOds(stripPrefix(ods));
                  setDropdownAberto(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {ods}
              </button>
            </li>
          ))}
        </ul>
      </div>,
      document.body
    );

  return (
    <div
      className="
        w-[825px] h-[111px]
        border-b border-[#DBDBDB] 
        pb-3 mb-6
        flex flex-col
      "
    >
      {/* ===== Searchbar (div própria, fixa: 825x48) ===== */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          className="
            w-[825px] h-12
            pr-10 pl-4
            border-[1.5px] border-[#E8E8E8] 
            rounded-sm 
            focus:outline-none focus:ring-2 focus:ring-[#294BB6] focus:border-transparent 
            bg-white
          "
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Image src={lupa} alt="Ícone de busca" width={40} height={40} />
        </div>
      </div>

      {/* ===== Filtros (div própria) ===== */}
      <div className="w-full">
        <div className="flex items-start gap-3">
          {/* Coluna esquerda: rótulo + dropdown (fixo) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-sm text-[#1D71B8] font-sans">
              <Filter size={16} />
              <span>Filtros:</span>
            </div>

            <button
              ref={btnRef}
              type="button"
              onClick={() => setDropdownAberto((v) => !v)}
              className="
                flex items-center justify-between 
                w-32 px-4 py-2 
                text-sm font-sans font-medium text-[#1D71B8] 
                bg-white border border-[#1D71B8] 
                rounded-full shadow-sm hover:bg-gray-50
                cursor-pointer
              "
              aria-expanded={dropdownAberto}
            >
              <span>ODS</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Coluna direita: pílulas com alinhamento à direita e SCROLL VERTICAL próprio */}
          <div className="flex-1 min-w-0 h-[51px] overflow-y-auto">
            <div className="w-full flex flex-wrap justify-end content-start gap-2 pr-1">
              {activeOds.map((nome, i) => (
                <div
                  key={`${nome}-${i}`}
                  className="flex items-center gap-2 pl-3 pr-1 py-1 text-sm font-sans font-medium bg-gray-100 text-[#1D71B8] rounded-full"
                >
                  <span>{nome}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveOds(nome)}
                    className="p-1 rounded-full hover:bg-gray-300 cursor-pointer"
                    aria-label={`Remover filtro ${nome}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {(activeOds.length > 0 || !!searchText) && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs underline text-gray-500 ml-1 cursor-pointer hover:opacity-80"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown via portal (fora da div, acima da linha) */}
      {dropdownEl}
    </div>
  );
}