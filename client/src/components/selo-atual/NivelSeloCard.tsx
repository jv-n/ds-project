import Image from "next/image";

interface NivelSeloCardProps {
  icon: any; 
  nivel: string;
  pontos: string;
  descricao: string;
}

export default function NivelSeloCard({ icon, nivel, pontos, descricao }: NivelSeloCardProps) {
  let cardBgColor = "bg-white";
  let cardOuterBorderColor = "border-gray-300";

  let buttonBorderColor = "border-gray-200"; 

  if (nivel.includes("Bronze")) {
    cardBgColor = "bg-[#FFEBD6]"; 
    cardOuterBorderColor = "border-[#E67E22]"; 
    buttonBorderColor = "border-[#E67E22]"; 
  } else if (nivel.includes("Prata")) {
    cardBgColor = "bg-[#D9EFFF]"; 
    cardOuterBorderColor = "border-[#009FE3]"; 
    buttonBorderColor = "border-[#009FE3]"; 
  } else if (nivel.includes("Ouro")) {
    cardBgColor = "bg-[#FFF4B3]"; 
    cardOuterBorderColor = "border-[#F3C42F]"; 
    buttonBorderColor = "border-[#F3C42F]"; 
  }

  return (
    <div className={`
      flex flex-col
      items-center
      p-6 // Este padding define o espaçamento interno do card
      rounded-xl
      shadow
      ${cardBgColor} // Fundo do CARD
      text-center
      border-2
      ${cardOuterBorderColor} // Aplica a cor da borda EXTERNA do CARD
    `}>
      {/* Ícone */}
      <Image src={icon} alt={`Ícone ${nivel}`} width={40} height={40} className="mb-4" />

      {/* Nível e Pontuação */}
      <h3 className="text-xl font-bold text-[#1B2029]">{nivel}</h3>
      <p className="text-sm mt-1 text-gray-700">{pontos}</p>

      {/* Descrição - flex-grow para empurrar o botão para baixo */}
      <p className="text-gray-600 text-sm mt-4 mb-auto flex-grow">{descricao}</p>

      {/* Botão Ver Critérios */}
      <button className={`
        mt-6
        w-full 
        py-2
        rounded-lg
        border-2
        ${buttonBorderColor}
        bg-white
        text-[#1B2029]
        font-semibold
      `}>
        Ver Critérios
      </button>
    </div>
  );
}