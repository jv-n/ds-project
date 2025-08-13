"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import GridAcoes from "@/components/grid-de-acoes";
import SearchbarComFiltrosODS from "@/components/search-bar-com-filtrosODS";

export default function AcoesPage() {
  const [searchText, setSearchText] = useState("");
  const [odsFilters, setOdsFilters] = useState<string[]>([]);

  const handleAddOds = (nomeODS: string) => {
    setOdsFilters((prev) => (prev.includes(nomeODS) ? prev : [...prev, nomeODS]));
  };
  const handleRemoveOds = (nomeODS: string) => {
    setOdsFilters((prev) => prev.filter((x) => x !== nomeODS));
  };
  const handleClearAll = () => {
    setSearchText("");
    setOdsFilters([]);
  };

  return (
    <div className="bg-[#F5F5F5] flex flex-col min-h-screen items-center pt-[88px]">
      <Navbar ativo="acoes" />

      <div className="mx-auto w-full max-w-2xl p-8 text-left">
        <div className="h-[70px] text-black font-sans text-[32px] font-bold text-center">
          Ações em Movimento
        </div>

        <div className="text-black font-sans text-[14px] text-center">
          Aqui é a área do engajamento. Conheça as ações realizadas por ONGs e
          movimentos sociais parceiros do <strong>Bora Impactar</strong> e
          escolha uma para fazer parte. Entre em campo e ajude a fazer a
          diferença. Nesse jogo, todo mundo ganha!
        </div>
      </div>

      {/* Bloco fixo (825x111) de busca + filtros */}
      <SearchbarComFiltrosODS
        searchText={searchText}
        onSearchTextChange={setSearchText}
        activeOds={odsFilters}
        onAddOds={handleAddOds}
        onRemoveOds={handleRemoveOds}
        onClearAll={handleClearAll}
      />

      {/* Grid recebe os critérios e filtra os cards */}
      <GridAcoes searchText={searchText} odsFilters={odsFilters} />

      <Rodape />
    </div>
  );
}