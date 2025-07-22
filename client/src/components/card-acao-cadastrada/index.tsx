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
}

export default function Cardcadastrado(props: Cardcontatosprops) {
  return (
    <div className="w-[360px] h-[255px] flex flex-col bg-white rounded-md shadow p-4 font-sans text-[#1B2029]">
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
        <div className="text-[12px] text-[#8a6e00] bg-[#FFF3CD] px-3 py-2 rounded-xl h-[21px] flex items-center">
          ● Aguardando aprovação de doação
        </div>
      </div>
    </div>
  );
}
