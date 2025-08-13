"use client";
import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal, setapbaixo, setapcima, downloadicon } from "@/assets";
import { useState } from "react";

interface PropsPontos {
  nivel: "goldenmedal" | "silvermedal" | "bronzemedal" | "none";
  pontos: {
    sdg: number;
    ngo: number;
    budget: number;
  };
}

const imagensPorNivel = {
  goldenmedal,
  silvermedal,
  bronzemedal,
  none: silvermedal,
};

const textonivel = {
  goldenmedal: "Nível Ouro",
  silvermedal: "Nível Prata",
  bronzemedal: "Nível Bronze",
  none: "Sem Selo",
};

const descricao = {
  bronzemedal: "Engajamento social inicial.",
  silvermedal: "Engajamento consistente com impacto.",
  goldenmedal: "Liderança e impacto significativo.",
  none: "Ainda sem selo atribuído.",
};

const coresPorNivel = {
  goldenmedal: "#F5B800",
  silvermedal: "#757575",
  bronzemedal: "#A56424",
  none: "#999999",
};

function ItemPontuacao({
  titulo,
  descricao,
  pontuacao,
}: {
  titulo: string;
  descricao: string;
  pontuacao: number;
}) {
  return (
    <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex justify-between items-center mb-3 px-4">
      <div className="flex flex-col">
        <div className="text-[14px] text-black font-bold">{titulo}</div>
        <div className="text-[12px] text-[#4A5565] font-bold">{descricao}</div>
      </div>
      <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center text-black font-bold text-[14px]">
        {pontuacao}pts
      </div>
    </div>
  );
}

export default function Cardpontos({ nivel, pontos }: PropsPontos) {
  const total = pontos.sdg + pontos.ngo + pontos.budget;
  const [mostrarpontos, setMostrarPontos] = useState("aberto");

  return (
    <div className="w-full flex justify-center items-center ml-[15px] font-sans">
      <div className="w-[1020px] min-h-[100px] border-[1px] bg-[#F8FBFF] rounded-lg px-6 py-4">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex items-center w-full mb-4 ml-[935px]">
            <Image src={imagensPorNivel[nivel]} alt="" />
            <div className="w-[170px] h-[40px] bg-[#009FE3] rounded-lg flex items-center justify-center text-white text-[15px] cursor-pointer ml-[300px]">
              <Image src={downloadicon} alt="" className="mr-[5px]" />
              Baixar Certificado
            </div>
          </div>

          <div className="text-[22px] text-[#757575] font-bold">{textonivel[nivel]}</div>
          <div className="font-sans text-[18px] text-black mt-[15px] mb-[5px]">
            Pontuação Atual: {total} pontos
          </div>
          <div
            className="font-sans text-[14px] mt-[5px] mb-[20px]"
            style={{ color: coresPorNivel[nivel] }}
          >
            {descricao[nivel]}
          </div>

          <div className="w-[950px] bg-[#F4F4F4] h-[55px] rounded-xl flex items-center mb-3 text-[16px] text-black font-bold px-4">
            Detalhamento da Pontuação
            <div
              className="ml-auto cursor-pointer"
              onClick={() =>
                setMostrarPontos(mostrarpontos === "aberto" ? "fechado" : "aberto")
              }
            >
              <Image
                src={mostrarpontos === "aberto" ? setapcima : setapbaixo}
                alt="toggle"
              />
            </div>
          </div>

          {mostrarpontos === "aberto" && (
            <div>
              <ItemPontuacao
                titulo="ODSs diferentes apoiadas"
                descricao={`Você apoiou ${pontos.sdg} ODS(s)`}
                pontuacao={pontos.sdg}
              />
              <ItemPontuacao
                titulo="ONGs diferentes apoiadas"
                descricao={`Você apoiou ${pontos.ngo} ONG(s)`}
                pontuacao={pontos.ngo}
              />
              <ItemPontuacao
                titulo="Valor total doado"
                descricao={`Valor total doado em R$`}
                pontuacao={pontos.budget}
              />
            </div>
          )}

          <div className="w-[950px] bg-[#009FE3] h-[55px] border-[1px] rounded-xl flex justify-end items-center px-4">
            <div className="text-white font-bold text-[16px] mr-auto">Total</div>
            <div className="text-white font-bold text-[16px]">{total} pontos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
