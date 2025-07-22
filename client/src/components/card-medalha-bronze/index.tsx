"use client";
import Image from "next/image";
import { bronzemedal } from "@/assets";

export interface CardMedalhaBronzeProps {
  abrirModal: (nivel: string) => void;
}

export default function CardMedalhaBronze(props: CardMedalhaBronzeProps) {
  return (
    <div className="w-[308px] h-[250.25px] flex flex-col bg-[#FDF5E6] rounded-xl shadow p-4 font-sans items-center ml-8">
      <div className="flex justify-center">
        <Image src={bronzemedal} alt="Ícone medalha de bronze" />
      </div>

      <div className="text-[15.8px] text-[#A56424] font-bold mt-[10px]">
        Nível Bronze
      </div>

      <div className="w-[86px] h-[19.5px] border border-[#0000001A] rounded-[7px] text-[10.5px] text-[#0A0A0A] text-center font-bold mt-[10px]">
        5 a 45 pontos
      </div>

      <div className="text-[12.3px] text-[#4A5565] text-center mt-4">
        Empresas em fase inicial ou com nível básico de engajamento social.
      </div>

      <div
        onClick={() => props.abrirModal("bronzemedal")}
        className="w-[276px] h-[28px] py-1 px-1 rounded-lg bg-white border border-[#CD7F32] font-bold text-[12.3px] text-[#0A0A0A] cursor-pointer flex justify-center mt-4"
      >
        Ver Critérios
      </div>
    </div>
  );
}
