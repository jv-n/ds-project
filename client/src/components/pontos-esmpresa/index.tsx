"use client";
import Image from "next/image";
import { useState } from "react";
import {
  goldenmedal,
  silvermedal,
  bronzemedal,
  setapbaixo,
  setapcima,
  download
} from "@/assets";
import ModalCertificado from "../modal-certificado";
import { CertificateProps } from "../certificate";

export interface propspontos {
  nivel: string;
  ptsodsscomatuacao:string;
  ptsongsatingidas: string;
  ptscolaboradoresengajados: string;
  ptsorcamentodestinado: string;
  certificado: CertificateProps;
}

const qtdodsscomatuacao: Record<string, string> = {
  "33": "Mais de 9 ODSs",
  "25": "7 a 8 ODSs",
  "14": "4 a 6 ODSs",
  "7": "1 a 3 ODSs",
};

const qtdongsatingidas: Record<string, string> = {
  "30": "7 ou mais ONGs",
  "20": "5 a 6 ONGs",
  "10": "3 a 4 ONGs",
  "5": "1 a 2 ONGs",
};

const qtdcolaboradoresengajados: Record<string, string> = {
  "21": "30% ou mais dos colaboradores",
  "12": "21% a 29% dos colaboradores",
  "9": "11% a 20% dos colaboradores",
  "6": "6% a 10% dos colaboradores",
  "4": "1% a 5% dos colaboradores",
};

const qtdorcamentodestinado: Record<string, string> = {
  "16": "Acima de R$ 50,000 doados",
  "8": "Acima de R$ 25,000 doados",
  "5": "Acima de R$ 10,000 doados",
  "3": "Acima de R$ 5,000 doados",
};

const imagensPorNivel = {
  goldenmedal,
  silvermedal,
  bronzemedal,
};

const textonivel = {
  goldenmedal: "Nível Ouro",
  silvermedal: "Nível Prata",
  bronzemedal: "Nível Bronze",
};

const descricao = {
  bronzemedal:
    "Empresas em fase inicial ou com nível básico de engajamento social.",
  silvermedal:
    "Empresas com bom nível de engajamento e programas sociais consistentes.",
  goldenmedal:
    "Empresas líderes em responsabilidade social, com impacto significativo e cultura de engajamento enraizada.",
};

const coresPorNivel = {
  goldenmedal: "#F5B800",
  silvermedal: "#757575",
  bronzemedal: "#A56424",
};

    

export default function Cardpontos(props: propspontos) {
  const total =
    Number(props.ptsodsscomatuacao) +
    Number(props.ptsongsatingidas) +
    Number(props.ptscolaboradoresengajados) +
    Number(props.ptsorcamentodestinado);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function abrirModal() {
    setIsModalOpen(true);  
  }
  function fecharModal() {
    setIsModalOpen(false);
  }

  const [mostrarpontos, setmomstrarpontos] = useState("aberto");

  const medalhaPorNivel = () => {
    if (props.nivel === "goldenmedal") {
      return "goldenmedal";
    } else if (props.nivel === "silvermedal") {
      return "silvermedal";
    } else {
      return "bronzemedal";
    }
  };

  return (
    <div className="w-full flex justify-center items-center ml-[15px] font-sans">
      <div className="w-[1020px] min-h-[100px] border-[1px] bg-[#F8FBFF] rounded-lg px-6 py-4">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex items-center w-full mb-4 ml-[935px]">
            <Image src={imagensPorNivel[medalhaPorNivel()]} alt="" />
            <div onClick={abrirModal} className="w-[170px] h-[40px] bg-[#009FE3] rounded-lg flex items-center justify-center text-white text-[15px] cursor-pointer ml-[300px]">
              <Image src={download} alt="" className="mr-[5px]" />
              Baixar Certificado
            </div>
          </div>
          <div className="text-[22px] text-[#757575] font-bold">
            {textonivel[medalhaPorNivel()]}
          </div>
          <div className="font-sans text-[18px] text-black mt-[15px] mb-[5px]">
            Pontuação Atual: {total} pontos
          </div>
          <div
            className="font-sans text-[14px] text-black mt-[5px] mb-[20px]"
            style={{ color: coresPorNivel[medalhaPorNivel()] }}
          >
            {descricao[medalhaPorNivel()]}
          </div>

          {/* Detalhamento da Pontuação */}
          <div className="w-[950px] bg-[#F4F4F4] h-[55px] rounded-xl flex items-center mb-3 text-[16px] text-black font-bold">
            <div className="ml-[10px]">Detalhamento da Pontuação</div>
            {mostrarpontos === "aberto" ? (
              <div
                className="ml-auto mr-[20px] cursor-pointer"
                onClick={() => setmomstrarpontos("fechado")}
              >
                <Image src={setapcima} alt="" />
              </div>
            ) : (
              <div
                className="ml-auto mr-[20px] cursor-pointer"
                onClick={() => setmomstrarpontos("aberto")}
              >
                <Image src={setapbaixo} alt="" />
              </div>
            )}
          </div>

          {mostrarpontos === "aberto" && (
            <div>
              <PontuacaoItem
                titulo="ODSs com Atuação da Empresa"
                descricao={qtdodsscomatuacao[String(props.ptsodsscomatuacao)]}
                pontos={props.ptsodsscomatuacao}
              />
              <PontuacaoItem
                titulo="ONGs Atingidas por Ações de Voluntariado"
                descricao={qtdongsatingidas[String(props.ptsongsatingidas)]}
                pontos={props.ptsongsatingidas}
              />
              <PontuacaoItem
                titulo="Colaboradores Engajados em Ações de Voluntariado"
                descricao={
                  qtdcolaboradoresengajados[
                    String(props.ptscolaboradoresengajados)
                  ]
                }
                pontos={props.ptscolaboradoresengajados}
              />
              <PontuacaoItem
                titulo="Orçamento Destinado a Voluntariado e Iniciativas Sociais"
                descricao={
                  qtdorcamentodestinado[String(props.ptsorcamentodestinado)]
                }
                pontos={props.ptsorcamentodestinado}
              />
            </div>
          )}

          {/* Total */}
          <div className="w-[950px] bg-[#009FE3] h-[55px] border-[1px] rounded-xl flex justify-end items-center px-4">
            <div className="text-white font-bold text-[16px] mr-auto">
              Total
            </div>
            <div className="text-white font-bold text-[16px]">
              {total} pontos
            </div>
          </div>
        </div>
      </div>
      <ModalCertificado
                  certificado={props.certificado}
                  isOpen={isModalOpen}
                  onClose={fecharModal}
              />
    </div>
  );
}

function PontuacaoItem({
  titulo,
  descricao,
  pontos
}: {
  titulo: string;
  descricao: string;
  pontos: string | number;
}) {
  return (
    <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex items-center justify-between px-4 mb-3">
      <div>
        <div className="text-[14px] text-black font-bold">{titulo}</div>
        <div className="text-[12px] text-[#4A5565] font-bold">{descricao}</div>
      </div>
      <div className="text-[14px] text-black font-bold">{pontos} pts</div>
    </div>
  );
}
