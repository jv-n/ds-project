import Image from "next/image";
import { goldenmedal, silvermedal, bronzemedal, xsair } from "@/assets";

export interface Criteriosprops {
  nivel: "goldenmedal" | "silvermedal" | "bronzemedal";
  fecharmodal: (nivel: string) => void;
}

const imagensPorNivel = {
  goldenmedal,
  silvermedal,
  bronzemedal,
};

const nomesPorNivel = {
  goldenmedal: "ouro",
  silvermedal: "prata",
  bronzemedal: "bronze",
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

export default function Modalcriterios(props: Criteriosprops) {
  return (
    <div className="w-[700px] flex flex-col bg-white rounded-xl shadow p-4 font-sans">
      <div className="mr-auto flex">
        <Image
          src={imagensPorNivel[props.nivel]}
          alt={`Selo ${props.nivel}`}
          className=""
        />

        <div className="ml-[5px]">
          <div className="flex">
            <div
              style={{ color: coresPorNivel[props.nivel] }}
              className="font-bold text-[20px]"
            >
              Nível {nomesPorNivel[props.nivel]}
            </div>
            <Image
              onClick={() => props.fecharmodal("off")}
              src={xsair}
              alt=""
              className="ml-[485px]   cursor-pointer"
            />
          </div>
          <div className="text-[#4A5565] mt-[-5px]">
            {" "}
            {pontosPorNivel[props.nivel]}{" "}
          </div>
        </div>
      </div>

      <div className="text-[#717182] mt-[3px]">
        Critérios e faixas de pontuação para o Nível {props.nivel}
      </div>

      <div
        className="flex w-[640px] text-[#364153] rounded-xl items-center pd-[5px] mt-[10px]"
        style={{ backgroundColor: cordescricaopornivel[props.nivel] }}
      >
        {" "}
        <div className="ml-[10px] mt-[10px] mb-[10px]">
          {descricao[props.nivel]}
        </div>
      </div>

      <div className="text-[16px] text-black font-bold mt-[10px]">
        Critérios de Avaliação
      </div>

      <div className="overflow-y-auto h-[400px] mr-[-16px]">
        <div className="border-[1px] mt-[10px] border-gray-300 pd-[10px] rounded-xl">
          <div className="flex flex-col items-center text-black">
            <div className="flex flex-col mr-auto font-bold text-black tetxt-[14px] ml-[15px] mt-[10px]">
              <div className="flex w-full">
                <div>
                  Quantidade de Ações de Conscientização e Educação Interna
                  sobre
                </div>
                <div className=" mt-[5px] text-[11px] ml-[12px] mr-[5px] w-[100px] h-[20px]  bg-[#ECEEF2] rounded-md flex justify-center items-center">
                  Máx: 30 pontos
                </div>
              </div>
              <div>ODSS</div>
            </div>
            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                Mais de 6 ações{" "}
                <div className="ml-auto mr-[5px]">
                  <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                    30pts
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                Até 5 ações
                <div className="ml-auto mr-[5px]">
                  <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                    25pts
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                Até 2 ações
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  7pts
                </div>
              </div>
            </div>

            <div className="bg-[#EFF6FF] w-[650px] flex flex-col rounded-xl mt-[8px] mb-[15px]">
              <div className="mt-[13px] mb-[13px] ml-[20px] ">
                <div className="text-[16px] text-black font-bold">
                  Justificativa:
                </div>
                <div className="flex-wrap mt-[10px]">
                  Fundamental para incentivar a cultura do voluntariado e da
                  doação desde a raiz. A educação interna capacita os
                  colaboradores, alinha-os com os objetivos sociais e cria uma
                  base sólida para o engajamento genuíno e sustentável da
                  empresa.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-[1px] mt-[10px] border-gray-300 pd-[10px] rounded-xl">
          <div className="flex flex-col items-center text-black">
            <div className="flex flex-col mr-auto ml-[15px] mt-[10px] font-bold text-black tetxt-[16px]">
              <div className="flex w-full">
                <div>Quantidade de ODSs com Atuação da Empresa</div>
                <div className="ml-[175px] mt-[5px] text-[11px] mr-[5px] w-[100px] h-[20px]  bg-[#ECEEF2] rounded-md flex justify-center items-center">
                  Máx: 25 pontos
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                Mais de 9 ODSs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  25pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                7 a 8 ODSs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  20pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                4 a 6 ODSs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  15pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                1 a 3 ODSs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  10pts
                </div>
              </div>
            </div>

            <div className="bg-[#EFF6FF] w-[650px] flex flex-col rounded-xl mt-[8px] mb-[15px]">
              <div className="mt-[13px] mb-[13px] ml-[20px] ">
                <div className="text-[16px] text-black font-bold">
                  Justificativa:
                </div>
                <div className="flex-wrap mt-[10px]">
                  Atuar em diversas ODSs demonstra um compromisso estratégico e
                  abrangente com os maiores desafios globais de
                  sustentabilidade. Isso posiciona a empresa como um agente de
                  mudança alinhado com a agenda internacional, maximizando seu
                  impacto.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-[1px] mt-[10px] border-gray-300 pd-[10px] rounded-xl">
          <div className="flex flex-col items-center text-black">
            <div className="flex flex-col mr-auto font-bold text-black text-[16px] ml-[15px] mt-[10px]">
              <div className="flex w-full">
                <div>
                  Quantidade de ONGs Atingidas por Ações de Voluntariado
                </div>
                <div className="ml-[90px] mt-[5px] text-[11px] mr-[5px] w-[100px] h-[20px]  bg-[#ECEEF2] rounded-md flex justify-center items-center">
                  Máx: 20 pontos
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                7 ou mais ONGs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  20pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                5 a 6 ONGs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  15pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                3 a 4 ONGs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  10pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                1 a 2 ONGs
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  5pts
                </div>
              </div>
            </div>

            <div className="bg-[#EFF6FF] w-[650px] flex flex-col rounded-xl mt-[8px] mb-[15px]">
              <div className="mt-[13px] mb-[13px] ml-[20px]">
                <div className="text-[16px] text-black font-bold">
                  Justificativa:
                </div>
                <div className="flex-wrap mt-[10px]">
                  Reflete a amplitude do impacto social da empresa e sua
                  capacidade de colaborar com diversas frentes e causas. O apoio
                  a múltiplas ONGs fortalece o ecossistema local de voluntariado
                  e doação.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[1px] mt-[10px] border-gray-300 pd-[10px] rounded-xl">
          <div className="flex flex-col items-center text-black">
            <div className="flex flex-col mr-auto font-bold text-black text-[16px] ml-[15px] mt-[10px]">
              <div className="flex w-[650px]">
                <div>
                  Porcentagem de Colaboradores Engajados em Ações de
                  Voluntariado
                </div>
                <div className="ml-[4px] mt-[5px] text-[11px] mr-[5px] w-[100px] h-[20px]  bg-[#ECEEF2] rounded-md flex justify-center items-center">
                  Máx: 15 pontos
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                30% ou mais dos colaboradores
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  15pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                21% a 29% dos colaboradores
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  12pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                11% a 20% dos colaboradores
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  9pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                6% a 10% dos colaboradores
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  6pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                1% a 5% dos colaboradores
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  2pts
                </div>
              </div>
            </div>

            <div className="bg-[#EFF6FF] w-[650px] flex flex-col rounded-xl mt-[8px] mb-[15px]">
              <div className="mt-[13px] mb-[13px] ml-[20px]">
                <div className="text-[16px] text-black font-bold">
                  Justificativa:
                </div>
                <div className="flex-wrap mt-[10px]">
                  Mede a materialização da cultura do voluntariado na prática. A
                  participação ativa dos colaboradores é a prova do sucesso na
                  promoção do engajamento humano e do impacto direto nas
                  iniciativas. Os intervalos são ajustados para serem realistas
                  mesmo para grandes empresas.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[1px] mt-[10px] border-gray-300 pd-[10px] rounded-xl">
          <div className="flex flex-col items-center text-black">
            <div className="flex flex-col mr-auto font-bold text-black text-[16px] ml-[15px] mt-[10px]">
              <div className="flex w-[650px]">
                <div>
                  Porcentagem do Orçamento Anual Destinado a Voluntariado e
                  Iniciativas Sociais
                </div>
                <div className="ml-[-12px] mt-[5px] text-[11px] mr-[5px] w-[100px] h-[20px]  bg-[#ECEEF2] rounded-md flex justify-center items-center">
                  Máx: 15 pontos
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                Acima de 0.3% do orçamento
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  10pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                0.21% a 0.3%
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  8pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                0.11% a 0.2%
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  5pts
                </div>
              </div>
            </div>

            <div className="h-[40px] w-[650px] bg-[#F9FAFB] mt-[10px] rounded-lg flex items-center">
              <div className="ml-[5px] flex w-full">
                Maior que 0% e menor ou igual a 0.1% do orçamento
                <div className="ml-auto mr-[5px] w-[53px] h-[20px] border-[1px] border-gray-400 bg-white rounded-md flex justify-center items-center">
                  2pts
                </div>
              </div>
            </div>

            <div className="bg-[#EFF6FF] w-[650px] flex flex-col rounded-xl mt-[8px] mb-[15px]">
              <div className="mt-[13px] mb-[13px] ml-[20px]">
                <div className="text-[16px] text-black font-bold">
                  Justificativa:
                </div>
                <div className="flex-wrap mt-[10px]">
                  Este critério reconhece o esforço financeiro proporcional da
                  empresa em relação à sua capacidade. É uma métrica equitativa
                  para diferentes portes de empresas, validando o
                  comprometimento orçamentário como combustível para as ações
                  sociais.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
