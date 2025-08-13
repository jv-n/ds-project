"use client";
import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal, xsair } from "@/assets";

export interface Criteriosprops {
  nivel: "goldenmedal" | "silvermedal" | "bronzemedal";
  fecharmodal: (nivel: string) => void;
}

const nomesPorNivel = {
  goldenmedal: "Ouro",
  silvermedal: "Prata",
  bronzemedal: "Bronze",
};

const coresPorNivel = {
  goldenmedal: "#F5B800",
  silvermedal: "#757575",
  bronzemedal: "#A56424",
};

const cordescricaopornivel = {
  goldenmedal: "#FFF8DC",
  silvermedal: "#F8F8FF",
  bronzemedal: "#FDF5E6",
};

const pontosPorNivel = {
  bronzemedal: "5 a 45 pontos",
  silvermedal: "46 a 74 pontos",
  goldenmedal: "75 a 100 pontos",
};

const descricao = {
  bronzemedal: "Empresas em fase inicial ou com nível básico de engajamento social.",
  silvermedal: "Empresas com bom nível de engajamento e programas sociais consistentes.",
  goldenmedal: "Empresas líderes em responsabilidade social, com impacto significativo e cultura de engajamento enraizada.",
};

export default function Modalcriterios(props: Criteriosprops) {
  const getMedalhaPorNivel = () => {
    switch (props.nivel) {
      case "goldenmedal": return goldenmedal;
      case "silvermedal": return silvermedal;
      case "bronzemedal": return bronzemedal;
      default: return bronzemedal;
    }
  };
  
  return (
    <div className="w-[700px] flex flex-col bg-white rounded-xl shadow p-4 font-sans">
      {/* Cabeçalho do Modal */}
      <div className="flex w-full">
        <Image src={getMedalhaPorNivel()} alt={`Selo ${nomesPorNivel[props.nivel]}`} />
        <div className="ml-[5px] flex-grow">
          <div className="flex justify-between">
            <div style={{ color: coresPorNivel[props.nivel] }} className="font-bold text-[20px]">
              Nível {nomesPorNivel[props.nivel]}
            </div>
            <button onClick={() => props.fecharmodal("off")} className="cursor-pointer">
              <Image src={xsair} alt="Fechar modal" />
            </button>
          </div>
          <div className="text-[#4A5565] mt-[-5px]">
            {pontosPorNivel[props.nivel]}
          </div>
        </div>
      </div>

      <div className="text-[#717182] mt-[3px]">
        Critérios e faixas de pontuação para o Nível {nomesPorNivel[props.nivel]}
      </div>

      <div className="w-full text-[#364153] rounded-xl p-[10px] mt-[10px]" style={{ backgroundColor: cordescricaopornivel[props.nivel] }}>
        {descricao[props.nivel]}
      </div>

      <div className="text-[16px] text-black font-bold mt-[10px]">
        Critérios de Avaliação
      </div>

      {/* Container com scroll para os critérios */}
      <div className="overflow-y-auto h-[400px] pr-2">
        
        {/*
          O CRITÉRIO ABAIXO (AÇÕES DE CONSCIENTIZAÇÃO) NÃO ESTÁ SENDO USADO NO NOVO SISTEMA DE PONTOS.
          ELE FOI MANTIDO AQUI COMO COMENTÁRIO PARA REFERÊNCIA FUTURA.
        */}
        {/*
        <div className="border mt-[10px] border-gray-300 p-4 rounded-xl">
          <div className="flex justify-between items-start font-bold text-black text-[14px]">
            <h3 className="w-4/5">Quantidade de Ações de Conscientização e Educação Interna sobre ODSs</h3>
            <div className="text-[11px] px-2 py-1 bg-[#ECEEF2] rounded-md whitespace-nowrap">
              Máx: 30 pontos
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Mais de 6 ações</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">30pts</div></div>
            <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Até 5 ações</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">25pts</div></div>
            <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Até 2 ações</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">7pts</div></div>
          </div>
          <div className="bg-[#EFF6FF] w-full rounded-xl mt-2 p-4">
            <h4 className="text-[16px] text-black font-bold">Justificativa:</h4>
            <p className="mt-2 text-sm">Fundamental para incentivar a cultura do voluntariado e da doação desde a raiz. A educação interna capacita os colaboradores, alinha-os com os objetivos sociais e cria uma base sólida para o engajamento genuíno e sustentável da empresa.</p>
          </div>
        </div>
        */}

        {/* Critério 1: ODSs com Atuação */}
        <div className="border mt-[10px] border-gray-300 p-4 rounded-xl">
            <div className="flex justify-between items-start font-bold text-black text-[14px]">
                <h3 className="w-4/5">Quantidade de ODSs com Atuação da Empresa</h3>
                <div className="text-[11px] px-2 py-1 bg-[#ECEEF2] rounded-md whitespace-nowrap">Máx: 40 pontos</div>
            </div>
            <div className="space-y-2 mt-2">
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Mais de 9 ODSs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">40pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>7 a 8 ODSs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">32pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>5 a 6 ODSs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">24pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>3 a 4 ODSs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">16pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>1 a 2 ODSs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">8pts</div></div>
            </div>
            <div className="bg-[#EFF6FF] w-full rounded-xl mt-2 p-4">
                <h4 className="text-[16px] text-black font-bold">Justificativa:</h4>
                <p className="mt-2 text-sm">Atuar em diversas ODSs demonstra um compromisso estratégico e abrangente com os maiores desafios globais de sustentabilidade. Isso posiciona a empresa como um agente de mudança alinhado com a agenda internacional, maximizando seu impacto.</p>
            </div>
        </div>

        {/* Critério 2: ONGs Atingidas */}
        <div className="border mt-[10px] border-gray-300 p-4 rounded-xl">
            <div className="flex justify-between items-start font-bold text-black text-[14px]">
                <h3 className="w-4/5">Quantidade de ONGs Atingidas por Ações de Voluntariado</h3>
                <div className="text-[11px] px-2 py-1 bg-[#ECEEF2] rounded-md whitespace-nowrap">Máx: 32 pontos</div>
            </div>
            <div className="space-y-2 mt-2">
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Mais de 7 ONGs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">32pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>5 a 6 ONGs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">24pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>3 a 4 ONGs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">16pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>1 a 2 ONGs</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">8pts</div></div>
            </div>
            <div className="bg-[#EFF6FF] w-full rounded-xl mt-2 p-4">
                <h4 className="text-[16px] text-black font-bold">Justificativa:</h4>
                <p className="mt-2 text-sm">Reflete a amplitude do impacto social da empresa e sua capacidade de colaborar com diversas frentes e causas. O apoio a múltiplas ONGs fortalece o ecossistema local de voluntariado e doação.</p>
            </div>
        </div>
        
        {/*
          O CRITÉRIO ABAIXO (COLABORADORES ENGAJADOS) NÃO ESTÁ SENDO USADO NO NOVO SISTEMA DE PONTOS.
          ELE FOI MANTIDO AQUI COMO COMENTÁRIO PARA REFERÊNCIA FUTURA.
        */}
        {/*
        <div className="border mt-[10px] border-gray-300 p-4 rounded-xl">
            <div className="flex justify-between items-start font-bold text-black text-[14px]">
                <h3 className="w-4/5">Porcentagem de Colaboradores Engajados em Ações de Voluntariado</h3>
                <div className="text-[11px] px-2 py-1 bg-[#ECEEF2] rounded-md whitespace-nowrap">Máx: 15 pontos</div>
            </div>
             <div className="space-y-2 mt-2">
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>30% ou mais dos colaboradores</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">15pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>21% a 29% dos colaboradores</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">12pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>11% a 20% dos colaboradores</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">9pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>6% a 10% dos colaboradores</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">6pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>1% a 5% dos colaboradores</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">2pts</div></div>
            </div>
            <div className="bg-[#EFF6FF] w-full rounded-xl mt-2 p-4">
                <h4 className="text-[16px] text-black font-bold">Justificativa:</h4>
                <p className="mt-2 text-sm">Mede a materialização da cultura do voluntariado na prática. A participação ativa dos colaboradores é a prova do sucesso na promoção do engajamento humano e do impacto direto nas iniciativas. Os intervalos são ajustados para serem realistas mesmo para grandes empresas.</p>
            </div>
        </div>
        */}

        {/* Critério 3: Orçamento Destinado */}
        <div className="border mt-[10px] border-gray-300 p-4 rounded-xl">
            <div className="flex justify-between items-start font-bold text-black text-[14px]">
                <h3 className="w-4/5">Orçamento Destinado a Doações</h3>
                <div className="text-[11px] px-2 py-1 bg-[#ECEEF2] rounded-md whitespace-nowrap">Máx: 28 pontos</div>
            </div>
            <div className="space-y-2 mt-2">
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Acima de R$ 50.000</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">28pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Acima de R$ 25.000</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">19pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Acima de R$ 10.000</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">13pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Acima de R$ 5.000</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">7pts</div></div>
                <div className="h-[40px] w-full bg-[#F9FAFB] rounded-lg flex items-center justify-between px-2"><span>Acima de R$ 1.000</span><div className="w-[53px] h-[20px] border border-gray-400 bg-white rounded-md flex justify-center items-center text-sm font-bold">1pt</div></div>
            </div>
            <div className="bg-[#EFF6FF] w-full rounded-xl mt-2 p-4">
                <h4 className="text-[16px] text-black font-bold">Justificativa:</h4>
                <p className="mt-2 text-sm">Este critério reconhece o esforço financeiro direto da empresa. É uma métrica clara do comprometimento orçamentário como combustível para as ações sociais.</p>
            </div>
        </div>
      </div>
    </div>
  );
}