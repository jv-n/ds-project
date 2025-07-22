"use client";
import Image from "next/image";
import { silvermedal } from "@/assets";

export interface CardMedalhaPrataProps {
  abrirModal: (nivel: string) => void;
}

export default function CardMedalhaPrata(props: CardMedalhaPrataProps) {
  return (
    <div className="w-[308px] h-[250.25px] flex flex-col bg-[#F8F8FF] rounded-xl shadow p-4 font-sans items-center ml-8">
      <div className="flex justify-center">
        <Image src={silvermedal} alt="ícone medalha de prata" />
      </div>

      <div className="text-[15.8px] text-[#757575] font-bold mt-[10px]">
        Nível Prata
      </div>

      <div className="w-[91px] h-[19.5px] border border-[#0000001A] rounded-[7px] text-[10.5px] text-[#0A0A0A] text-center font-bold mt-[10px]">
        46 a 74 pontos
      </div>

      <div className="text-[12.3px] text-[#4A5565] text-center mt-4">
        Empresas com bom nível de engajamento e programas sociais consistentes.
      </div>

      <div
        onClick={() => props.abrirModal("silvermedal")}
        className="w-[276px] h-[28px] py-1 px-1 rounded-lg bg-white border border-[#C0C0C0] font-bold text-[13px] text-[#0A0A0A] cursor-pointer flex justify-center mt-4"
      >
        Ver Critérios
      </div>
    </div>
  );
}
