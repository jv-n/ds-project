'use client';

import Image from "next/image";
import { useState } from "react";
import { logoamassada } from "@/assets"; 
import DetalhesPontuacao from "@/components/accordion-detalhes-pontuacao";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import CardMedalhaPrata from "@/components/card-medalha-prata";
import CardMedalhaOuro from "@/components/card-medalha-ouro";
import { Bronze, Prata, Ouro } from "@/assets"; 
import ModalCertificado from "@/components/modal-certificado";
import { CertificateProps } from "@/components/certificate";

export default function SelosPage() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function abrirModal() {
    setIsModalOpen(true);  
  }
  function fecharModal() {
    setIsModalOpen(false);
  }

  const certificado: CertificateProps = {
    id: "certificado-123",
    level: "Prata",
    data_emissao: "10/06/2025",
    empresa: "Construções Recife",
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      {/* Cabeçalho do Selo */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-[#1B2029]">Selo de Impacto Social</h1>
        <p className="text-gray-600 mt-2">
          Avalie o nível de responsabilidade social da sua empresa e veja os critérios para cada nível do selo
        </p>

        {/* Nível Atual e Botão */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <div className="flex flex-col items-center md:items-start">
            {/* Ícone do Selo Prata*/}
            <Image src={Prata} alt="Ícone Nível Prata" width={50} height={50} className="mb-2" />
            <h2 className="text-2xl font-bold text-[#1B2029]">Nível Prata</h2>
            <p className="text-gray-600">Pontuação Atual: 68 pontos</p>
            <p className="text-gray-600 text-sm mt-1">
              Empresas com bom nível de engajamento e programas sociais consistentes.
            </p>
          </div>
          <button onClick={abrirModal} className="bg-[#009FE3] text-white px-6 py-3 rounded-lg flex items-center gap-2 mt-4 md:mt-0 hover:bg-[#007BB5] transition-colors duration-200 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Baixar Certificado
          </button>
        </div>
      </div>

      {/* Detalhamento da Pontuação */}
      <DetalhesPontuacao />

      {/* Níveis de Selo */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-[#1B2029] mb-6">Níveis de Selo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardMedalhaBronze
            categoria="Nível Bronze"
            pontuacao="5 a 45 pontos"
            descricao="Empresas em fase inicial ou com nível básico de engajamento social."
            criterios="Ver Criterios"
          />
          <CardMedalhaPrata
            categoria="Nível Prata"
            pontuacao="46 a 74 pontos"
            descricao="Empresas com bom nível de engajamento e programas sociais consistentes."
            criterios="Ver Criterios"
          />
          <CardMedalhaOuro
            categoria="Nível Ouro"
            pontuacao="75 a 100 pontos"
            descricao="Empresas líderes em responsabilidade social com impacto significativo e cultura de engajamento enraizada."
            criterios="Ver Criterios"
          />
        </div>
      </div>
      <ModalCertificado
          certificado={certificado}
          isOpen={isModalOpen}
          onClose={fecharModal}
      />
    </div>
  );
}