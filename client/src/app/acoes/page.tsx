"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import GridAcoes from "@/components/grid-de-acoes";
import SearchbarComFiltrosODS from "@/components/search-bar-com-filtrosODS";

// ...existing code...

export default function AcoesPage() {
  const [searchText, setSearchText] = useState("");
  const [odsFilters, setOdsFilters] = useState<string[]>([]);

  // --- Novo: garante empresaId no localStorage em ambiente de desenvolvimento ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "empresaId";
    const existing = localStorage.getItem(key);
    if (!existing) {
      const defaultId = process.env.NEXT_PUBLIC_DEFAULT_EMPRESA_ID;
      if (defaultId) {
        localStorage.setItem(key, defaultId);
        console.info(`[DEV] empresaId salvo em localStorage: ${defaultId}`);
      } else {
        console.info("[DEV] empresaId ausente em localStorage. Execute localStorage.setItem('empresaId','<id>') no console.");
      }
    }
  }, []);

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
          escolha uma para fazer parte.
        </div>
      </div>

      <SearchbarComFiltrosODS
        searchText={searchText}
        onSearchTextChange={setSearchText}
        activeOds={odsFilters}
        onAddOds={handleAddOds}
        onRemoveOds={handleRemoveOds}
        onClearAll={handleClearAll}
      />

      <GridAcoes searchText={searchText} odsFilters={odsFilters} />

      <Rodape />
    </div>
  );
}