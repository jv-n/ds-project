"use client";
import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal, setapbaixo, setapcima, downloadicon } from "@/assets";
import { useState } from "react";

export interface propspontos {
  nivel: string;
  ptsacoesdeconscientizacao: string;
  ptsodsscomatuacao: string;
  ptsongsatingidas: string;
  ptscolaboradoresengajados: string;
  ptsorcamentodestinado: string;
}

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

const textonivel: Record<string, string> = {
  goldenmedal: "Nível Ouro",
  silvermedal: "Nível Prata",
  bronzemedal: "Nível Bronze",
};

const descricao: Record<string, string> = {
  bronzemedal: "Empresas em fase inicial ou com nível básico de engajamento social.",
  silvermedal: "Empresas com bom nível de engajamento e programas sociais consistentes.",
  goldenmedal: "Empresas líderes em responsabilidade social, com impacto significativo e cultura de engajamento enraizada.",
};

const coresPorNivel: Record<string, string> = {
  goldenmedal: "#F5B800",
  silvermedal: "#757575",
  bronzemedal: "#A56424",
};

export default function Cardpontos(props: propspontos) {
  const [mostrarpontos, setMostrarPontos] = useState("aberto");

  const total =
    (parseInt(props.ptsongsatingidas) || 0) +
    (parseInt(props.ptsodsscomatuacao) || 0) +
    (parseInt(props.ptsorcamentodestinado) || 0);

  const medalha =
    props.nivel === "goldenmedal"
      ? goldenmedal
      : props.nivel === "silvermedal"
      ? silvermedal
      : bronzemedal;

  return (
    <div className="w-full flex justify-center items-center font-sans">
      <div className="w-[1020px] min-h-[100px] border-[1px] bg-[#F8FBFF] rounded-lg px-6 py-4">
        <div className="w-full flex flex-col justify-center items-center">
          
          {/* ##### CORREÇÃO APLICADA AQUI ##### */}
          {/* Botão de download movido para o canto superior direito absoluto */}
          <div className="w-full flex justify-end">
            <div className="w-[170px] h-[40px] bg-[#009FE3] rounded-lg flex items-center justify-center text-white text-[15px] cursor-pointer">
              <Image src={downloadicon} alt="Download" className="mr-[5px]" />
              Baixar Certificado
            </div>
          </div>
          
          {/* Conteúdo centralizado */}
          <div className="flex flex-col items-center mt-[-40px]"> {/* Margem negativa para compensar o espaço do botão */}
              <Image src={medalha} alt={`Selo ${textonivel[props.nivel]}`} />
              <div className="text-[22px] text-[#757575] font-bold mt-2">
                  {textonivel[props.nivel] || "Nível não definido"}
              </div>
              <div className="font-sans text-[18px] text-black mt-[15px] mb-[5px]">
                  Pontuação Atual: {total} pontos
              </div>
              <div
                  className="font-sans text-[14px] text-black mt-[5px] mb-[20px] text-center"
                  style={{ color: coresPorNivel[props.nivel] }}
              >
                  {descricao[props.nivel] || "Descrição não disponível."}
              </div>
          </div>
          {/* ##### FIM DA CORREÇÃO ##### */}

          {/* Barra de Detalhamento da Pontuação */}
          <div className="w-[950px] bg-[#F4F4F4] h-[55px] rounded-xl flex items-center mb-3 text-[16px] text-black font-bold">
            <div className="ml-[10px]">Detalhamento da Pontuação</div>
            <button 
              className="ml-auto mr-[20px] cursor-pointer" 
              onClick={() => setMostrarPontos(mostrarpontos === "aberto" ? "fechado" : "aberto")}
            >
              <Image src={mostrarpontos === "aberto" ? setapcima : setapbaixo} alt="Mostrar/Esconder detalhes" />
            </button>
          </div>

          {/* Detalhes dos Pontos */}
          {mostrarpontos === "aberto" && (
            <div className="w-[950px]">
              {/* Pontuação ODSs */}
              <div className="w-full bg-white h-[65px] border border-gray-300 rounded-xl flex items-center px-4 mb-3">
                <div>
                  <div className="text-[14px] text-black font-bold">ODSs com atuação</div>
                  <div className="text-[12px] text-[#4A5565] font-bold">{qtdodsscomatuacao[props.ptsodsscomatuacao] || "Nenhum ponto registrado"}</div>
                </div>
                <div className="ml-auto w-[53px] h-[20px] border border-gray-400 rounded-md flex justify-center items-center text-black font-bold text-[14px]">
                  {props.ptsodsscomatuacao}pts
                </div>
              </div>
              
              {/* Pontuação ONGs */}
              <div className="w-full bg-white h-[65px] border border-gray-300 rounded-xl flex items-center px-4 mb-3">
                <div>
                  <div className="text-[14px] text-black font-bold">ONGs atingidas</div>
                  <div className="text-[12px] text-[#4A5565] font-bold">{qtdongsatingidas[props.ptsongsatingidas] || "Nenhum ponto registrado"}</div>
                </div>
                <div className="ml-auto w-[53px] h-[20px] border border-gray-400 rounded-md flex justify-center items-center text-black font-bold text-[14px]">
                  {props.ptsongsatingidas}pts
                </div>
              </div>

              {/* Pontuação Orçamento */}
              <div className="w-full bg-white h-[65px] border border-gray-300 rounded-xl flex items-center px-4 mb-3">
                <div>
                  <div className="text-[14px] text-black font-bold">Orçamento Destinado a Doações</div>
                  <div className="text-[12px] text-[#4A5565] font-bold">{qtdorcamentodestinado[props.ptsorcamentodestinado] || "Nenhum ponto registrado"}</div>
                </div>
                <div className="ml-auto w-[53px] h-[20px] border border-gray-400 rounded-md flex justify-center items-center text-black font-bold text-[14px]">
                  {props.ptsorcamentodestinado}pts
                </div>
              </div>
            </div>
          )}

          {/* Barra de Total */}
          <div className="w-[950px] bg-[#009FE3] h-[55px] border rounded-xl flex items-center px-4 mt-1">
            <div className="text-white font-bold text-[16px]">Total</div>
            <div className="ml-auto text-white font-bold text-[16px]">{total} pontos</div>
          </div>
        </div>
      </div>
    </div>
  );
}