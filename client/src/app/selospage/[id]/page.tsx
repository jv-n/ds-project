"use client";
import Rodape from "@/components/rodape";
import { useCallback, useEffect, useState /*, useEffect*/ } from "react";
import Modalcriterios from "@/components/modal-criterios";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import CardMedalhaOuro from "@/components/card-medalha-ouro";
import CardMedalhaPrata from "@/components/card-medalha-prata";
import Cardpontos from "@/components/pontos-esmpresa";
import Navbar from "@/components/navbar";
import api from "@/services/api";
import { CertificateProps } from "@/components/certificate";
import { useParams } from "next/navigation";

// TODO: INTEGRAR A EXTRAÇÃO DO LOGIN FEITA EM NAVBAR NESSA PÁGINA, TALVEZ ALTERAR A LÓGICA DELA QUE UTILIZA O USER ID AO INVÉS DE COMPANY ID
export default function SelosPage() {

  const [mostrarcriterios, Setcriterios] = useState("off");

    interface companyProps {
    nome: string;
    pontos: number;
    selo_nivel: string;
    usuario: {
        id: string;
        nome: string;
        cnpj: string;
    }
  }

    const { id } = useParams();

    interface sealProps {
        nivel: string;
        ptsodsscomatuacao: string;
        ptsongsatingidas: string;
        ptscolaboradoresengajados: string;
        ptsorcamentodestinado: string;
    }

  const [seal, setSeal] = useState({} as sealProps);

  const fetchSeal = useCallback(async () => {
    const response = await api.get<sealProps>(`//${id}`);
    setSeal(response.data);
  }, [id]);

  const [company, setCompany] = useState({} as companyProps);

  const fetchCompany = useCallback(async () => {
    const response = await api.get<companyProps>(`//${id}`);
    setCompany(response.data);
  }, [id]);

  useEffect(() => {
    fetchSeal();
    fetchCompany();
  }, [fetchSeal, fetchCompany]);


  const certificado: CertificateProps = {
      id: id as string,
      level: seal.nivel,
      data_emissao: new Date().toISOString(),
      empresa: company.nome,
    };

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
        nivel={seal.nivel}
        ptsodsscomatuacao={seal.ptsodsscomatuacao}
        ptsongsatingidas={seal.ptsongsatingidas}
        ptscolaboradoresengajados={seal.ptscolaboradoresengajados}
        ptsorcamentodestinado={seal.ptsorcamentodestinado}
        certificado={certificado}
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