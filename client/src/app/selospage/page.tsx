"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import { useState } from "react";
import Modalcriterios from "@/components/modal-criterios";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import CardMedalhaOuro from "@/components/card-medalha-ouro";
import CardMedalhaPrata from "@/components/card-medalha-prata";
import { goldenmedal } from "@/assets";
import Cardpontos from "@/components/pontos-esmpresa";

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
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] w-screen pt-[88px]">
      <Navbar ativo="selos" />

      <div className="font-sans font-bold text-[32px] text-black mt-[25px] flex justify-center mr-[620px]">
        <div>Selo de Impacto Social</div>
      </div>

      <div className="font-sans text-[14px] text-black mt-[5px] mb-[30px] flex justify-center mr-[350px]">
        <div>
          Avalie o nível de responsabilidade social da sua empresa e veja os
          critérios para cada nível do selo
        </div>
      </div>

      <Cardpontos
        nivel="silvermedal"
        ptsacoesdeconscientizacao="30"
        ptsodsscomatuacao="10"
        ptsongsatingidas="10"
        ptscolaboradoresengajados="15"
        ptsorcamentodestinado="10"
      />

      <div className="font-sans font-bold text-[32px] text-black mr-[630px] mt-[25px] flex justify-center">
        <div>Selo de Impacto Social</div>
      </div>

      <div className="w-full flex items-center justify-center mt-[50px]">
        <div className="flex items-center justify-between">
          <CardMedalhaBronze abrirModal={Setcriterios} />
          <div className="ml-[15px] mr-[15px]">
            <CardMedalhaPrata abrirModal={Setcriterios} />
          </div>
          <CardMedalhaOuro abrirModal={Setcriterios} />
        </div>
      </div>

      <div>
        <div className="flex-grow flex justify-center items-center">
          {mostrarcriterios == "bronzemedal" && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
              <Modalcriterios nivel="bronzemedal" fecharmodal={Setcriterios} />
            </div>
          )}

          {mostrarcriterios == "goldenmedal" && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
              <Modalcriterios nivel="goldenmedal" fecharmodal={Setcriterios} />
            </div>
          )}

          {mostrarcriterios == "silvermedal" && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
              <Modalcriterios nivel="silvermedal" fecharmodal={Setcriterios} />
            </div>
          )}
        </div>
      </div>

      <div className="h-[100px]" />

      <Rodape />
    </div>
  );
}
