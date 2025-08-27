"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { maozona } from "@/assets";

export default function DoacoesPageSemAcoes() {
  const router = useRouter();

  const handleGoToAcoes = () => {
    router.push("/acoes"); 
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center col-span-full mx-auto"
      style={{
        width: "1130px",
        height: "338px",
        paddingTop: "42px",
        paddingBottom: "42px",
        gap: "16px",
      }}
    >
      {/* Ícone */}
      <Image src={maozona} alt="Mão Zona" width={128} height={128} />

      {/* Título */}
      <h1 className="text-[16px] font-medium text-[#2C2C2C]">
        Nenhum contato realizado ainda
      </h1>

      {/* Texto secundário */}
      <p className="text-[14px] text-[#6B6B6B]">
        Explore as ações disponíveis e entre em contato com ONGs para começar a fazer a diferença
      </p>

      {/* Botão */}
      <button
        onClick={handleGoToAcoes}
        className="px-6 py-2 bg-[#009FE3] text-white rounded-sm hover:bg-[#008ac0] transition-colors cursor-pointer"
      >
        Ver ações disponíveis
      </button>
    </div>
  );
}



