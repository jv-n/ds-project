// page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import Cardacao from "@/components/card-de-acao";
import Cardcontatos from "@/components/card-cadastrar-doacao";
import { useState } from "react";
import Cardcadastrado from "@/components/card-acao-cadastrada";
import Modalcontatos from "@/components/modal-contato";
import Modalcriterios from "@/components/modal-criterios";
import SelosPage from "./selospage";

export default function Home() {
  const [ativo, setAtivo] = useState("acoes");
  const [ativocontato, setAtivoContato] = useState("acoes");
  const [mostrarModal, setMostrarModal] = useState(false);

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar ativo={ativo} setAtivo={setAtivo} />

      <div className="flex-grow flex flex-col items-center">
        <div className="flex justify-center mt-6">
          <Link href="/formulario-empresas">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Ir para o Formulário de Empresas
            </button>
          </Link>
        </div>
        {/* <Cardacao
          nomeacao="Projeto Esperança"
          descricao="A ONG atua com comunidades vulneráveis promovendo educação e saúde."
          ods1="mulheres"
          ods2="combate a fome"
          ods3="animais"
          ods4="ODS"
          nomedaong="Instituto Viver Bem"
          onEntrarContato={abrirModal}
        />

        <Cardcontatos
          nomeacao="Campanha Inverno Solidário"
          descricao="Ajude famílias em situação de vulnerabilidade com roupas e cobertores."
          email="contato@ongsocial.org"
          fone="(41) 99999-0000"
          qtdacoescadastradas="12"
          nomedaong="ONG Social Brasil"
          ativocontato={ativocontato}
        />

        <Cardcadastrado
          nomeacao="Campanha Inverno Solidário"
          descricao="Ajude famílias com roupas e cobertores durante o inverno."
          email="contato@ongsocial.org"
          fone="(41) 99999-0000"
          qtdacoescadastradas="12"
          nomedaong="ONG Social Brasil"
        />

        {mostrarModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
            <Modalcontatos
              nomedaong="Instituto Viver Bem"
              nomeacao="Projeto Esperança"
              emailong="contato@viverbem.org"
              numeroong="(41) 99999-9999"
              onEntrarContato={fecharModal}
            />
          </div>
        )} */}
        {ativo === "acoes" && <Modalcriterios nivel="Ouro" />}
        {ativo === "selos" && <SelosPage />}
      </div>

      <Rodape />
    </div>
  );
}