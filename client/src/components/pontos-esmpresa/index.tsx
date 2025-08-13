"use client";
import { logoamassada } from "@/assets";
import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal } from "@/assets";
import { useState } from "react";
import { setapbaixo, setapcima, downloadicon } from "@/assets";

export interface propspontos {
  nivel: "goldenmedal" | "silvermedal" | "bronzemedal";
  ptsacoesdeconscientizacao: "30" | "25" | "7";
  ptsodsscomatuacao: "25" | "20" | "15" | "10";
  ptsongsatingidas: "20" | "15" | "10" | "5";
  ptscolaboradoresengajados: "15" | "12" | "9" | "6" | "2";
  ptsorcamentodestinado: "10" | "8" | "5" | "2";
}

const qtdacoesdeconscientizacao: Record<string, string> = {
  "30": "Mais de 6 ações",
  "25": "Até 5 ações",
  "7": "Até 2 ações",
};

const qtdodsscomatuacao: Record<string, string> = {
  "25": "Mais de 9 ODSs",
  "20": "7 a 8 ODSs",
  "15": "4 a 6 ODSs",
  "10": "1 a 3 ODSs",
};

const qtdongsatingidas: Record<string, string> = {
  "20": "7 ou mais ONGs",
  "15": "5 a 6 ONGs",
  "10": "3 a 4 ONGs",
  "5": "1 a 2 ONGs",
};

const qtdcolaboradoresengajados: Record<string, string> = {
  "15": "30% ou mais dos colaboradores",
  "12": "21% a 29% dos colaboradores",
  "9": "11% a 20% dos colaboradores",
  "6": "6% a 19% dos colaboradores",
  "2": "1% a 5% dos colaboradores",
};

const qtdorcamentodestinado: Record<string, string> = {
  "10": "Acima de 0.3% do orçamento",
  "8": "0.21% a 0.3%",
  "5": "0.11% a 0.2%",
  "2": "Maior que 0% e menor ou igual a 0.1% do orçamento",
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
    Number(props.ptsacoesdeconscientizacao) +
    Number(props.ptsodsscomatuacao) +
    Number(props.ptsongsatingidas) +
    Number(props.ptscolaboradoresengajados) +
    Number(props.ptsorcamentodestinado);

  const [mostrarpontos, setmomstrarpontos] = useState("aberto");

  return (
    <div className="w-full flex justify-center items-center ml-[15px] font-sans">
      <div className="w-[1020px] min-h-[100px] border-[1px] bg-[#F8FBFF] rounded-lg px-6 py-4">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex items-center  w-full mb-4 ml-[935px]">
            <Image src={imagensPorNivel[props.nivel]} alt="" />
            <div className="w-[170px] h-[40px] bg-[#009FE3] rounded-lg flex items-center justify-center text-white text-[15px] cursor-pointer ml-[300px]">
              <Image src={downloadicon} alt="" className="mr-[5px]" />
              Baixar Certificado
            </div>
          </div>
          <div className="text-[22px] text-[#757575] font-bold">
            {textonivel[props.nivel]}
          </div>
          <div className="font-sans text-[18px] text-black mt-[15px] mb-[5px]">
            Pontuação Atual: {total} pontos
          </div>
          <div
            className="font-sans text-[14px] text-black mt-[5px] mb-[20px]"
            style={{ color: coresPorNivel[props.nivel] }}
          >
            {descricao[props.nivel]}
          </div>
          {/* preciso que dentro dessa div avaixo tenha o texto */}
          <div className="w-[950px] bg-[#F4F4F4] h-[55px] rounded-xl flex items-center mb-3 text-[16px] text-black font-bold">
            <div className="ml-[10px]">Detalhamento da Pontuação</div>
            {mostrarpontos == "aberto" && (
              <div
                className="ml-auto mr-[20px] cursor-pointer"
                onClick={() => setmomstrarpontos("fechado")}
              >
                <Image src={setapcima} alt="" />
              </div>
            )}
            {mostrarpontos == "fechado" && (
              <div
                className="ml-auto mr-[20px] cursor-pointer"
                onClick={() => setmomstrarpontos("aberto")}
              >
                <Image src={setapbaixo} alt="" />
              </div>
            )}
          </div>
          {mostrarpontos == "aberto" && (
            <div>
              {/* Ações de Conscientização e Educação Interna sobre ODSS   */}
              <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
                <div className="ml-[10px]">
                  <div className="flex items-center">
                    <div>
                      <div className="text-[14px] text-black font-bold flex">
                        Ações de Conscientização e Educação Interna sobre ODSS
                        <div className="ml-auto mr-[10px]"></div>
                      </div>
                      <div className="text-[12px] text-[#4A5565] font-bold">
                        {
                          qtdacoesdeconscientizacao[
                            props.ptsacoesdeconscientizacao
                          ]
                        }
                      </div>
                    </div>
                    <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                      {props.ptsacoesdeconscientizacao}pts
                    </div>
                  </div>
                </div>
              </div>

              {/* ODSs com Atuação da Empresa */}
              <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
                <div className="ml-[10px]">
                  <div className="flex items-center">
                    <div>
                      <div className="text-[14px] text-black font-bold flex">
                        ODSs com Atuação da Empresa
                        <div className="ml-auto mr-[10px]"></div>
                      </div>
                      <div className="text-[12px] text-[#4A5565] font-bold">
                        {qtdodsscomatuacao[props.ptsodsscomatuacao]}
                      </div>
                    </div>
                    <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                      {props.ptsodsscomatuacao}pts
                    </div>
                  </div>
                </div>
              </div>

              {/* ONGs Atingidas por Ações de Voluntariado */}
              <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
                <div className="ml-[10px]">
                  <div className="flex items-center">
                    <div>
                      <div className="text-[14px] text-black font-bold flex">
                        ONGs Atingidas por Ações de Voluntariado
                        <div className="ml-auto mr-[10px]"></div>
                      </div>
                      <div className="text-[12px] text-[#4A5565] font-bold">
                        {qtdongsatingidas[props.ptsongsatingidas]}
                      </div>
                    </div>
                    <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                      {props.ptsongsatingidas}pts
                    </div>
                  </div>
                </div>
              </div>

              {/* Colaboradores Engajados em Ações de Voluntariado */}
              <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
                <div className="ml-[10px]">
                  <div className="flex items-center">
                    <div>
                      <div className="text-[14px] text-black font-bold flex">
                        Colaboradores Engajados em Ações de Voluntariado
                        <div className="ml-auto mr-[10px]"></div>
                      </div>
                      <div className="text-[12px] text-[#4A5565] font-bold">
                        {
                          qtdcolaboradoresengajados[
                            props.ptscolaboradoresengajados
                          ]
                        }
                      </div>
                    </div>
                    <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                      {props.ptscolaboradoresengajados}pts
                    </div>
                  </div>
                </div>
              </div>

              {/* Orçamento Destinado a Voluntariado e Iniciativas Sociais */}
              <div className="w-[950px] bg-[#FFFFFF] h-[55px] border-[1px] border-gray-300 rounded-xl flex flex-col justify-center mb-3">
                <div className="ml-[10px]">
                  <div className="flex items-center">
                    <div>
                      <div className="text-[14px] text-black font-bold flex">
                        Orçamento Destinado a Voluntariado e Iniciativas Sociais
                        <div className="ml-auto mr-[10px]"></div>
                      </div>
                      <div className="text-[12px] text-[#4A5565] font-bold">
                        {qtdorcamentodestinado[props.ptsorcamentodestinado]}
                      </div>
                    </div>
                    <div className="w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center ml-auto text-black font-bold text-[14px] mr-[10px]">
                      {props.ptsorcamentodestinado}pts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
          {/* Fim do if mostrarpontos == "aberto" */}
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
    </div>
  );
}
