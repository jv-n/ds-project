"use client";
import Image from "next/image";
import { predio, mail, fone, maozinha } from "@/assets";
import { Dispatch, SetStateAction } from "react";

export interface Cardcontatosprops {
  nomeacao: string;
  descricao: string;
  email: string;
  fone: string;
  qtdacoescadastradas: string;
  nomedaong: string;
  ativocontato: string;
}

export default function Cardcontatos(props: Cardcontatosprops) {
  const estaAtivo = props.ativocontato === props.nomeacao;

  return (
    <div className="w-[400px] flex flex-col bg-white rounded-xl shadow p-4 font-sans text-[#1B2029] ml-8">
      <div className="text-[16px] font-bold">{props.nomeacao}</div>

      <div className="text-[12px] mt-[7px]">{props.descricao}</div>

      <div className="flex items-center mt-[16px]">
        <Image src={predio} alt="ícone prédio" />
        <div className="text-[12px] ml-[10px]">{props.nomedaong}</div>
      </div>

      <div className="flex items-center mt-[16px]">
        <Image src={mail} alt="ícone mail" />
        <div className="text-[12px] ml-[10px]">{props.email}</div>
      </div>

      <div className="flex items-center mt-[16px]">
        <Image src={fone} alt="ícone fone" />
        <div className="text-[12px] ml-[10px]">{props.fone}</div>
      </div>

      <div className="flex items-center mt-[16px]">
        <div className="h-[32px] w-[144px] bg-[#294BB6] flex justify-center items-center rounded-sm text-white text-sm cursor-pointer">
          cadastrar doação
        </div>

        <div className="text-[12px] text-[#1D71B8] ml-auto mr-[12px] flex items-center">
          <Image src={maozinha} alt="ícone mão" className="mr-[5px]" />
          {props.qtdacoescadastradas} doações cadastradas
        </div>
      </div>
    </div>
  );
}
