import React, { forwardRef } from 'react';
import { logoamassada } from "@/assets";
import Image from "next/image";

// Use forwardRef para permitir que o componente receba uma 'ref'
const Rodape = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  return (
    // Adicione a 'ref' ao elemento div principal do rodapé
    <div
      ref={ref}
      className="w-full h-[220px] bg-[#009FE3] flex items-center text-white"
    >
      <div className="flex-col ml-[100px] mb-[10px]">
        <Image src={logoamassada} alt="" className="" />
        <div className="font-bold text-xl mt-[20]">Bora Impactar</div>
        <div className="text-xl">A união que transforma </div>
        <div className="text-xl">vidas</div>
      </div>
    </div>
  );
});

Rodape.displayName = 'Rodape';

export default Rodape;
