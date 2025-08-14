"use client";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import { useState, useEffect } from "react";
import Modalcriterios from "@/components/modal-criterios";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import CardMedalhaOuro from "@/components/card-medalha-ouro";
import CardMedalhaPrata from "@/components/card-medalha-prata";
import Cardpontos from "@/components/pontos-esmpresa";

interface ITierData {
  tier: string;
  totalScore: number;
  points: {
    sdg: number;
    ngo: number;
    budget: number;
    service: number;
  };
}

export default function Home() {
  const [mostrarcriterios, Setcriterios] = useState("off");
  const [tierData, setTierData] = useState<ITierData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTierData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch("/api/users/me/tier", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar dados");
        }

        const data = await response.json();
        setTierData(data.data);
      } catch (error) {
        console.error("Erro ao buscar dados do selo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTierData();
  }, []);

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

      {/* Exibição condicional */}
      {loading ? (
        <div className="text-center">Carregando seus pontos...</div>
      ) : tierData ? (
        <Cardpontos
          nivel={tierData.tier.toLowerCase() + "medal"} // ex: "pratamedal"
          ptsodsscomatuacao={tierData.points.sdg.toString()}
          ptsongsatingidas={tierData.points.ngo.toString()}
          ptsorcamentodestinado={tierData.points.budget.toString()}
          ptsvoluntarios={tierData.points.service.toString()}
          ptsacoesdeconscientizacao="0"
          ptscolaboradoresengajados="0"
        />
      ) : (
        <div className="text-center">
          Não foi possível carregar os dados. Tente novamente mais tarde.
        </div>
      )}

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
