"use client";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import GridAcoes from "@/components/grid-de-acoes";
import FiltroODS from "@/components/filtros-ods";

// Criando a página funcional
export default function AcoesPage() {
  const [searchTerm, setSearchTerm] = "";

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

      <FiltroODS />
      <GridAcoes />
      <Rodape />
    </div>
  );
}
