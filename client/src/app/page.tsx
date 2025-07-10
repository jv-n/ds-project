"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import Cardacao from "@/components/card-de-acao";
import Cardcontatos from "@/components/card-cadastrar-doacao";
import { useState } from "react";
import Cardcadastrado from "@/components/card-acao-cadastrada";
import Modalcontatos from "@/components/modal-contato";
import Modalcriterios from "@/components/modal-criterios";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import { Bronzemedal } from "@/assets";

export default function Home() {
  const [ativo, setAtivo] = useState("acoes");
  const [ativocontato, setAtivoContato] = useState("acoes");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarcriterios, Setcriterios] = useState("off");

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar ativo={ativo} setAtivo={setAtivo} />

      <div className="flex-grow flex justify-center items-center">
        <CardMedalhaBronze abrirModal={Setcriterios} />

        {mostrarcriterios == "Bronzemedal" && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
            <Modalcriterios nivel="Bronzemedal" fecharmodal={Setcriterios} />
          </div>
        )}

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
      </div>

      <Rodape />
    </div>
  );
}
