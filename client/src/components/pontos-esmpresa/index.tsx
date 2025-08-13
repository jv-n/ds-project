"use client";
import { logoamassada } from "@/assets";
import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal } from "@/assets";
import { useState } from "react";
import { setapbaixo, setapcima, downloadicon } from "@/assets";

// Interface atualizada para aceitar qualquer string, tornando-a compatível com os dados da API.
export interface propspontos {
  nivel: string;
  ptsacoesdeconscientizacao: string;
  ptsodsscomatuacao: string;
  ptsongsatingidas: string;
  ptscolaboradoresengajados: string;
  ptsorcamentodestinado: string;
}

// Mapeamento de pontos para descrições, atualizado com base na lógica do seu TierService.ts
const qtdodsscomatuacao: Record<string, string> = {
  "40": "Mais de 9 ODSs",
  "32": "7 a 8 ODSs",
  "24": "5 a 6 ODSs",
  "16": "3 a 4 ODSs",
  "8": "1 a 2 ODSs",
  "0": "Nenhuma atuação em ODSs",
};

const qtdongsatingidas: Record<string, string> = {
  "32": "Mais de 7 ONGs",
  "24": "5 a 6 ONGs",
  "16": "3 a 4 ONGs",
  "8": "1 a 2 ONGs",
  "0": "Nenhuma ONG atingida",
};

const qtdorcamentodestinado: Record<string, string> = {
  "28": "Acima de R$ 50.000",
  "19": "Acima de R$ 25.000",
  "13": "Acima de R$ 10.000",
  "7": "Acima de R$ 5.000",
  "1": "Acima de R$ 1.000",
  "0": "Nenhum orçamento destinado",
};


export default function Cardpontos(props: propspontos) {
  const [mostrarpontos, setPontos] = useState("fechado");

  function abrirPontos() {
    setPontos("aberto");
  }

  function fecharPontos() {
    setPontos("fechado");
  }

  const medalha =
    props.nivel === "goldenmedal"
      ? goldenmedal
      : props.nivel === "silvermedal"
      ? silvermedal
      : bronzemedal;
      
  const total =
    (parseInt(props.ptsongsatingidas) || 0) +
    (parseInt(props.ptsodsscomatuacao) || 0) +
    (parseInt(props.ptsorcamentodestinado) || 0);

  const nivelFormatado = props.nivel.replace("medal", "").charAt(0).toUpperCase() + props.nivel.replace("medal", "").slice(1);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[950px] bg-white h-[55px] border-[1px] border-gray-300 rounded-xl flex items-center px-4">
        <Image src={medalha} alt={`Medalha ${nivelFormatado}`} />
        <div className="text-black font-bold text-[16px] ml-2">
          Sua empresa atingiu um total de {total} pontos e conquistou o selo de
          nível {nivelFormatado}
        </div>
        <button className="ml-auto" onClick={mostrarpontos === "aberto" ? fecharPontos : abrirPontos}>
          <Image src={mostrarpontos === "aberto" ? setapcima : setapbaixo} alt="Seta para expandir" />
        </button>
        <button className="ml-4">
          <Image src={downloadicon} alt="Baixar selo" />
        </button>
      </div>

      {mostrarpontos == "aberto" && (
        <div className="w-[950px] mt-2">
          {/* Pontuação ODSs */}
          <div className="w-[950px] bg-white h-[65px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
            <div className="ml-[10px]">
              <div className="flex items-center">
                <div>
                  <div className="text-[14px] text-black font-bold flex">
                    ODSs com atuação
                  </div>
                  <div className="text-[12px] text-[#4A5565] font-bold">
                    {qtdodsscomatuacao[props.ptsodsscomatuacao] || "Nenhum ponto registrado"}
                  </div>
                </div>
                <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                  {props.ptsodsscomatuacao}pts
                </div>
              </div>
            </div>
          </div>
          {/* Pontuação ONGs */}
          <div className="w-[950px] bg-white h-[65px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
            <div className="ml-[10px]">
              <div className="flex items-center">
                <div>
                  <div className="text-[14px] text-black font-bold flex">
                    ONGs atingidas
                  </div>
                  <div className="text-[12px] text-[#4A5565] font-bold">
                    {qtdongsatingidas[props.ptsongsatingidas] || "Nenhum ponto registrado"}
                  </div>
                </div>
                <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                  {props.ptsongsatingidas}pts
                </div>
              </div>
            </div>
          </div>
          {/* Pontuação Orçamento */}
          <div className="w-[950px] bg-white h-[65px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
            <div className="ml-[10px]">
              <div className="flex items-center">
                <div>
                  <div className="text-[14px] text-black font-bold flex">
                    Orçamento Destinado a Voluntariado e Iniciativas Sociais
                  </div>
                  <div className="text-[12px] text-[#4A5565] font-bold">
                    {qtdorcamentodestinado[props.ptsorcamentodestinado] || "Nenhum ponto registrado"}
                  </div>
                </div>
                <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                  {props.ptsorcamentodestinado}pts
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Total */}
      <div className="w-[950px] bg-[#009FE3] h-[55px] border-[1px] rounded-xl flex justify-end items-center px-4 mt-1">
        <div className="text-white font-bold text-[16px] mr-auto ml-2">
          Total
        </div>
        <div className="text-white font-bold text-[16px]">
          {total} pontos
        </div>
      </div>
    </div>
  );
}