"use client";
import Image from "next/image";
import { goldenmedal } from "@/assets";

export interface CardMedalhaOuroProps {
  abrirModal: (nivel: string) => void;
}

export default function CardMedalhaOuro(props: CardMedalhaOuroProps) {
  return (
    <div className="w-[308px] h-[250.25px] flex flex-col bg-[#FFF8DC] rounded-xl shadow p-4 font-sans items-center ml-8">
      <div className="flex justify-center">
        <Image src={goldenmedal} alt="Ícone medalha de ouro" />
      </div>

      <div className="text-[15.8px] text-[#F5B800] font-bold mt-[10px]">
        Nível Ouro
      </div>

      <div className="w-[91px] h-[19.5px] border border-[#0000001A] rounded-[7px] text-[10.5px] text-[#0A0A0A] text-center font-bold mt-[10px]">
        75 a 100 pontos
      </div>

      <div className="text-[12.3px] text-[#4A5565] text-center mt-[7px]">
        Empresas líderes em responsabilidade social, com impacto significativo e
        cultura de engajamento enraizada.
      </div>

      <div
        onClick={() => props.abrirModal("goldenmedal")}
        className="w-[276px] h-[28px] py-1 px-1 rounded-lg bg-white border border-[#F5B800] font-bold text-[12.3px] text-[#0A0A0A] cursor-pointer flex justify-center mt-4"
      >
        Ver Critérios
      </div>
    </div>
  );
}
