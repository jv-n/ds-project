"use client";
import Image from "next/image";
import silvermedal from '../../assets/silvermedal.svg';

export interface CardMedalhaPrataProps {
    categoria: string;
    pontuacao: string;
    descricao: string;
    criterios: string;
}

export default function CardMedalhaPrata(props: CardMedalhaPrataProps){
    return(
        <div className="w-[308px] h-[250.25px] flex flex-col bg-[#F8F8FF] rounded-xl shadow p-4 font-Sans items-center ml-8">
            <div className="flex justify-center">
                <Image src={silvermedal} alt="ícone medalha de prata" />
            </div>
            
            <div className= "text-[15.8px] text-[#757575] font-bold mt-[10px]">{props.categoria}</div>

            <div className= "w-[91px] h-[19.5px] border border-[#0000001A] rounded-[7px] text-[10.5px] text-[#0A0A0A] text-center font-bold mt-[10px]">{props.pontuacao}</div>
        
            <div className= "text-[12.3px] text-[#4A5565] text-center mt-4">{props.descricao}</div>

            <div className= "w-[276px] h-[28px] py-1 px-1 rounded-lg bg-white border border-[#C0C0C0] font-bold text-[13px] text-[#0A0A0A] cursor-pointer flex justify-center mt-4">{props.criterios}</div>            

        </div>
    );
}