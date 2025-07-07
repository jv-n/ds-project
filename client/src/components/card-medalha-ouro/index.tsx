"use client";

import Image from "next/image";
import goldenmedal from '../../assets/goldenmedal.svg';

export interface CardMedalhaOuroProps {
    categoria: string;
    pontuacao: string;
    descricao: string;
    criterios: string;
}

export default function CardMedalhaOuro(props: CardMedalhaOuroProps){
    return(
        <div className="flex flex-col bg-[#FFF8DC] rounded-xl shadow-lg p-4 font-sans items-center h-full">
            <div className="flex justify-center mb-2">
                <Image src={goldenmedal} alt="Ícone medalha de ouro" />
            </div>
            
            <div className="text-[15.8px] text-[#F5B800] font-bold mt-2">{props.categoria}</div>

            <div className="border border-[#0000001A] rounded-[7px] text-[10.5px] text-[#0A0A0A] text-center font-bold py-0.5 px-2 mt-2">{props.pontuacao}</div>

            <div className="text-sm text-[#4A5565] text-center mt-4 flex-grow">
                {props.descricao}
            </div>

            <div className="w-full py-1 px-1 rounded-lg bg-white border border-[#F5B800] font-bold text-sm text-[#0A0A0A] cursor-pointer flex justify-center mt-4">
                {props.criterios}
            </div>
        </div>
    );
}