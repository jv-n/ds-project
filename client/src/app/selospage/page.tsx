"use client";
import Rodape from "@/components/rodape";
import { useState /*, useEffect*/ } from "react";
import Modalcriterios from "@/components/modal-criterios";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import CardMedalhaOuro from "@/components/card-medalha-ouro";
import CardMedalhaPrata from "@/components/card-medalha-prata";
import Cardpontos from "@/components/pontos-esmpresa";
import Navbar from "@/components/navbar";
// import { useParams } from "next/navigation";

export default function SelosPage() {
  // const { id } = useParams();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarcriterios, Setcriterios] = useState("off");

  // const [dadosSelo, setDadosSelo] = useState(null);

  // useEffect(() => {
  //   async function fetchSelo() {
  //     try {
  //       const res = await fetch(`/api/seal/company/${id}`);
  //       const data = await res.json();
  //       setDadosSelo(data);
  //     } catch (error) {
  //       console.error("Erro ao buscar selo:", error);
  //     }
  //   }

  //   if (id) fetchSelo();
  // }, [id]);

  // 🔧 MOCK: dados simulados da API
  const dadosSelo = {
    nivel: "bronzemedal",
    ptsodsscomatuacao: "14",
    ptsongsatingidas: "10",
    ptscolaboradoresengajados: "9",
    ptsorcamentodestinado: "8"
  };

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] w-screen pt-[88px]">
      <Navbar ativo="selos" />

      <div className="font-sans font-bold text-[32px] text-black mt-[25px] flex justify-center mr-[620px]">
        <div>Selo de Impacto Social</div>
      </div>

      <div className="font-sans text-[14px] text-black mt-[5px] mb-[30px] flex justify-center mr-[350px]">
        <div>
          Avalie o nível de responsabilidade social da sua empresa e veja os
          critérios para cada nível do selo
        </div>
      </div>

      {/* 🔧 Exibe os pontos simulados */}
      <Cardpontos
        nivel={dadosSelo.nivel}
        ptsodsscomatuacao={dadosSelo.ptsodsscomatuacao}
        ptsongsatingidas={dadosSelo.ptsongsatingidas}
        ptscolaboradoresengajados={dadosSelo.ptscolaboradoresengajados}
        ptsorcamentodestinado={dadosSelo.ptsorcamentodestinado}
      />

      <div className="font-sans font-bold text-[32px] text-black mr-[630px] mt-[25px] flex justify-center">
        <div>Selo de Impacto Social</div>
      </div>

      <div className="w-full flex items-center justify-center mt-[50px]">
        <div className="flex items-center justify-between">
          <CardMedalhaBronze abrirModal={Setcriterios} />
          <div className="ml-[15px] mr-[15px]">
            <CardMedalhaPrata abrirModal={Setcriterios} />
          </div>
          <CardMedalhaOuro abrirModal={Setcriterios} />
        </div>
      </div>

      <div>
        <div className="flex-grow flex justify-center items-center">
          {mostrarcriterios == "bronzemedal" && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
              <Modalcriterios nivel="bronzemedal" fecharmodal={Setcriterios} />
            </div>
          )}

          {mostrarcriterios == "goldenmedal" && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
              <Modalcriterios nivel="goldenmedal" fecharmodal={Setcriterios} />
            </div>
          )}

          {mostrarcriterios == "silvermedal" && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-300 flex justify-center items-center z-50 ">
              <Modalcriterios nivel="silvermedal" fecharmodal={Setcriterios} />
            </div>
          )}
        </div>
      </div>

      <div className="h-[100px]" />

      <Rodape />
    </div>
  );
}