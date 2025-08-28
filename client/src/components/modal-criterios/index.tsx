import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal, close } from "@/assets";
import { Dispatch, SetStateAction } from "react";

export interface Criteriosprops {
  nivel: string;
  fecharmodal: Dispatch<SetStateAction<string>>;
}

const imagensPorNivel = {
  goldenmedal,
  silvermedal,
  bronzemedal,
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
  bronzemedal:
    "Empresas em fase inicial ou com nível básico de engajamento social.",
  silvermedal:
    "Empresas com bom nível de engajamento e programas sociais consistentes.",
  goldenmedal:
    "Empresas líderes em responsabilidade social, com impacto significativo e cultura de engajamento enraizada.",
};

const nomeselonovo = {
  bronzemedal: "Selo Empresa Aderente",
  silvermedal: "Selo Empresa Engajada",
  goldenmedal: "Selo Empresa de Impacto",
};

export default function Modalcriterios(props: Criteriosprops) {
  const porNivel = () => {
    if (props.nivel == "goldenmedal") return "goldenmedal";
    else if (props.nivel == "silvermedal") return "silvermedal";
    else return "bronzemedal";
  };

  return (
    <div className="w-[700px] flex flex-col bg-white rounded-xl shadow p-4 font-sans">
      <div className="mr-auto flex">
        <Image src={imagensPorNivel[porNivel()]} alt={`Selo ${props.nivel}`} />
        <div className="ml-[5px]">
          <div className="flex">
            <div
              style={{ color: coresPorNivel[porNivel()] }}
              className="font-bold text-[20px] w-[300px]"
            >
              {nomeselonovo[porNivel()]}
            </div>
            <Image
              onClick={() => props.fecharmodal("off")}
              src={close}
              alt=""
              className="ml-[330px] cursor-pointer"
            />
          </div>
          <div className="text-[#4A5565] mt-[-5px]">
            {pontosPorNivel[porNivel()]}
          </div>
        </div>
      </div>

      <div className="text-[#717182] mt-[3px]">
        Critérios e faixas de pontuação para o {nomeselonovo[porNivel()]}
      </div>

      <div
        className="flex w-[640px] text-[#364153] rounded-xl items-center pd-[5px] mt-[10px]"
        style={{ backgroundColor: cordescricaopornivel[porNivel()] }}
      >
        <div className="ml-[10px] mt-[10px] mb-[10px]">
          {descricao[porNivel()]}
        </div>
      </div>

      <div className="text-[16px] text-black font-bold mt-[10px]">
        Critérios de Avaliação
      </div>

      <div className="overflow-y-auto h-[400px] mr-[-16px]">
        {/* ODSs com atuação */}
        <Criterio
          titulo="Quantidade de ODSs com Atuação da Empresa"
          max="33"
          faixas={[
            ["Mais de 9 ODSs", 33],
            ["7 a 8 ODSs", 20],
            ["5 a 6 ODSs", 15],
            ["3 a 4 ODSs", 10],
            ["1 a 2 ODSs", 5],
          ]}
          justificativa="Atuar em diversas ODSs demonstra um compromisso estratégico e abrangente com os maiores desafios globais de sustentabilidade. Isso posiciona a empresa como um agente de mudança alinhado com a agenda internacional, maximizando seu impacto."
        />

        {/* ONGs atingidas */}
        <Criterio
          titulo="Quantidade de ONGs Atingidas por Ações de Voluntariado"
          max="30"
          faixas={[
            ["7 ou mais ONGs", 30],
            ["5 a 6 ONGs", 25],
            ["3 a 4 ONGs", 14],
            ["1 a 2 ONGs", 7],
          ]}
          justificativa="Reflete a amplitude do impacto social da empresa e sua capacidade de colaborar com diversas frentes e causas. O apoio a múltiplas ONGs fortalece o ecossistema local de voluntariado e doação."
        />

        {/* Engajamento de colaboradores */}
        <Criterio
          titulo="Porcentagem de Colaboradores Engajados em Ações de Voluntariado"
          max="21"
          faixas={[
            ["30% ou mais dos colaboradores", 21],
            ["21% a 29%", 12],
            ["11% a 20%", 9],
            ["6% a 10%", 6],
            ["1% a 5%", 4],
          ]}
          justificativa="Mede a materialização da cultura do voluntariado na prática. A participação ativa dos colaboradores é a prova do sucesso na promoção do engajamento humano e do impacto direto nas iniciativas. Os intervalos são ajustados para serem realistas mesmo para grandes empresas."
        />

        {/* Valor doado */}
        <Criterio
          titulo="Valor Total Doado pela Empresa"
          max="16"
          faixas={[
            ["Acima de R$ 50.000", 16],
            ["R$ 25.000 a R$ 49.999", 8],
            ["R$ 10.000 a R$ 24.999", 5],
            ["R$ 5.000 a R$ 9.999", 1],
          ]}
          justificativa="Este critério reconhece o esforço financeiro proporcional da empresa em relação à sua capacidade. É uma métrica equitativa para diferentes portes de empresas, validando o comprometimento orçamentário como combustível para as ações sociais."
        />
      </div>
    </div>
  );
}

function Criterio({
  titulo,
  max,
  faixas,
  justificativa,
}: {
  titulo: string;
  max: string;
  faixas: [string, number][];
  justificativa: string;
}) {
  return (
    <div className="border-[1px] mt-[10px] border-gray-300 pd-[10px] rounded-xl">
      <div className="flex flex-col items-center text-black">
        <div className="flex flex-col mr-auto font-bold text-black text-[16px] ml-[15px] mt-[10px]">
          <div className="flex w-[650px]">
            <div>{titulo}</div>
            <div className="ml-auto mt-[5px] text-[11px] mr-[5px] w-[100px] h-[20px] bg-[#ECEEF2] rounded-md flex justify-center items-center">
              Máx: {max} pontos
            </div>
          </div>
        </div>

        {faixas.map(([label, pontos], index) => (
          <div
            key={index}
            className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center"
          >
            <div className="ml-[5px] flex w-full">
              {label}
              <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                {pontos}pts
              </div>
            </div>
          </div>
        ))}

        <div className="bg-[#EFF6FF] w-[650px] flex flex-col rounded-xl mt-[8px] mb-[15px]">
          <div className="mt-[13px] mb-[13px] ml-[20px]">
            <div className="text-[16px] text-black font-bold">
              Justificativa:
            </div>
            <div className="flex-wrap mt-[10px]">{justificativa}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
