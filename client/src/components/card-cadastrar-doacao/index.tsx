"use client";
import Image from "next/image";
import { predio, mail, fone, maozinha } from "@/assets";

interface ActionCardProps {
  nomeacao: string;
  descricao: string;
  email: string;
  telefone: string;
  qtdacoescadastradas: number;
  nomedaong: string;
  status: "Pendente" | "Aprovada" | "Rejeitada" | null;
  onCadastrarDoacaoClick: (ongName: string, actionName: string) => void;
}

export default function ActionCard({
  nomeacao,
  descricao,
  email,
  telefone,
  qtdacoescadastradas,
  nomedaong,
  status,
  onCadastrarDoacaoClick,
}: ActionCardProps) {
  let cardFooter;

  if (status === "Pendente") {
    cardFooter = (
      <div className="flex items-center mt-[16px]">
        <div className="text-[12px] text-[#894B00] bg-[#FEF9C2] pl-2 pr-3 py-2 rounded-xl flex items-center">
          <div className="w-[7px] h-[7px] rounded-full bg-[#FDC700] mr-1 flex-shrink-0"></div>
          <span className="font-medium text-[12px] leading-[14px] tracking-normal">
            Aguardando aprovação de doação
          </span>
        </div>
      </div>
    );
  } else if (qtdacoescadastradas === 0) {
    cardFooter = (
      <div className="flex items-center mt-[16px]">
        <div
          className="h-[32px] w-[200px] bg-[#294BB6] flex justify-center items-center rounded-sm text-white text-sm cursor-pointer"
          onClick={() => onCadastrarDoacaoClick(nomedaong, nomeacao)}
        >
          Cadastrar primeira doação
        </div>
      </div>
    );
  } else {
    cardFooter = (
      <div className="flex items-center mt-[16px] w-full">
        <div
          className="h-[32px] w-[144px] bg-[#294BB6] flex justify-center items-center rounded-sm text-white text-sm cursor-pointer"
          onClick={() => onCadastrarDoacaoClick(nomedaong, nomeacao)}
        >
          Cadastrar doação
        </div>
        {qtdacoescadastradas === 1 && (
          <div className="text-[12px] text-[#1D71B8] ml-auto mr-[12px] flex items-center font-medium leading-[160%] tracking-normal">
            <Image src={maozinha} alt="ícone mão" className="mr-[5px]" />
              {qtdacoescadastradas} doação aprovada
          </div>
        )}
        {qtdacoescadastradas > 1 && (
          <div className="text-[12px] text-[#1D71B8] ml-auto mr-[12px] flex items-center font-medium leading-[160%] tracking-normal">
            <Image src={maozinha} alt="ícone mão" className="mr-[5px]" />
              {qtdacoescadastradas} doações aprovadas
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-[360px] h-[255px] flex flex-col bg-white rounded-md shadow p-4 font-sans text-[#1B2029]">
      <div className="text-[16px] font-bold">{nomeacao}</div>

      <div className="text-[12px] mt-[7px] flex-grow">{descricao}</div>

      <div className="flex items-center mt-[16px]">
        <Image src={predio} alt="ícone prédio" />
        <div className="text-[12px] ml-[10px]">{nomedaong}</div>
      </div>

      <div className="flex items-center mt-[16px]">
        <Image src={mail} alt="ícone mail" />
        <div className="text-[12px] ml-[10px]">{email}</div>
      </div>

      <div className="flex items-center mt-[16px]">
        <Image src={fone} alt="ícone fone" />
        <div className="text-[12px] ml-[10px]">{telefone}</div>
      </div>

      {cardFooter}
    </div>
  );
}