"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import Cardacao from "@/components/card-de-acao";
import { useState } from "react";

export default function Home() {
  const [ativo, setAtivo] = useState("acoes");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar ativo={ativo} setAtivo={setAtivo} />

      <div className="flex-grow flex justify-center items-center">
        <Cardacao
          nomeacao="Projeto Esperança"
          descricao="A ONG atua com comunidades vulneráveis promovendo educação e saúde."
          ods1="mulheres"
          ods2="combate a fome"
          ods3="animais"
          ods4="ODS"
          nomedaong="Instituto Viver Bem"
        />
      </div>

      <Rodape />
    </div>
  );
}
