"use client";

import { useState, useEffect, useCallback } from "react";
import RowAuditoria, {
  type RowAuditoriaProps,
} from "@/components/row-auditoria";
import ModalRevisao from "@/components/modal-revisao";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import { Search } from "lucide-react";
import axios from 'axios';

type Auditoria = RowAuditoriaProps;


const mapStatus = (status: string): 'aguardando' | 'aprovada' | 'reprovada' => {
  switch (status.toLowerCase()) {
    case 'pendente':
      return 'aguardando';

    // Se o status for 'aprovado' OU 'aprovada', ele executará o código abaixo
    case 'aprovado':
    case 'aprovada': 
      return 'aprovada';

    // Se o status for 'reprovado' OU 'reprovada', ele executará o código abaixo
    case 'reprovado': 
    case 'reprovada':
      return 'reprovada';
      
    default:
      return 'aguardando';
  }
};


export default function AuditoriaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuditoria, setSelectedAuditoria] = useState<Auditoria | null>(null);
  const [activeFilter, setActiveFilter] = useState("aguardando");
  const [searchTerm, setSearchTerm] = useState("");
  const [dadosAuditoria, setDadosAuditoria] = useState<Auditoria[]>([]);

  const carregarDadosDeAuditoria = useCallback(async () => {
    const baseURL = 'https://vigilant-spork-qwr7grqg564c6x5j-3001.app.github.dev';
    try {
      const responseDoacoes = await axios.get(`${baseURL}/donations/audit`);
      const doacoesIncompletas: any[] = responseDoacoes.data;

      const dadosMapeadosPromises = doacoesIncompletas.map(async (item) => {
        try {
          const [responseAcoes, responseEmpresa] = await Promise.all([
            axios.get(`${baseURL}/actions/company/${item.empresaId}`),
            axios.get(`${baseURL}/company/${item.empresaId}`)
          ]);

          const todasAcoesDaEmpresa = responseAcoes.data;
          const dadosDaEmpresa = responseEmpresa.data;
          const acaoCompleta = todasAcoesDaEmpresa.find(acao => acao.acaoId === item.acaoId);

          if (!acaoCompleta) {
            console.warn(`Ação com ID ${item.acaoId} não foi encontrada.`);
            return null;
          }

          const nomeDaEmpresa = dadosDaEmpresa?.nome ?? 'Empresa sem nome';
          const emailDaEmpresa = dadosDaEmpresa?.usuario?.email ?? 'Email não informado';

          return {
            id: `aud-${item.id}`,
            nomeEmpresa: nomeDaEmpresa,
            emailEmpresa: emailDaEmpresa,
            nomeONG: acaoCompleta.nomeOng ?? 'ONG não informada',
            acao: acaoCompleta.nome ?? 'Ação sem nome',
            tipoDoacao: item.tipo,
            dataDoacao: item.data,
            valorDoacao: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor),
            status: mapStatus(item.status), // Agora a tradução vai funcionar
            motivoReprovacao: item.motivoReprovacao,
            documentos: item.documentos ?? [],
          };

        } catch (error) {
          console.error(`Falha ao processar doação ID ${item.id}:`, error);
          return null;
        }
      });

      const dadosMapeados = (await Promise.all(dadosMapeadosPromises)).filter(Boolean);
      setDadosAuditoria(dadosMapeados as Auditoria[]);

    } catch (error) {
      console.error('Erro geral ao carregar dados da auditoria:', error);
    }
  }, []);

  useEffect(() => {
    carregarDadosDeAuditoria();
  }, [carregarDadosDeAuditoria]);

  const handleUpdateStatus = (newStatus: 'aprovada' | 'reprovada') => {
    if (!selectedAuditoria) return;

    setDadosAuditoria(currentData =>
      currentData.map(item =>
        item.id === selectedAuditoria.id
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  const filteredAuditorias = dadosAuditoria.filter((auditoria) => {
    const statusMatch =
      activeFilter === "todos" ||
      auditoria.status.toLowerCase() === activeFilter.toLowerCase();
    
    const searchMatch =
      (auditoria.nomeEmpresa?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (auditoria.nomeONG?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? "todos" : filterName);
  };

  function openModal(auditoria: Auditoria) {
    setSelectedAuditoria(auditoria);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="bg-[#F5F5F5] flex flex-col min-h-screen">
      <Navbar variant="logout" onLogout={() => alert("Saindo...")} />

      <main className="px-[52px] pb-8 pt-[80px] flex-grow gap-9">
        <div className="max-w-7xl py-8 flex flex-col gap-9">
          <div>
            <h1 className="text-black font-sans text-[32px] font-bold ">
              Auditoria de doações
            </h1>
            <p className="text-[#1F1F1F] font-sans text-[16px] font-normal">
              Aprove ou reprove as documentações submetidas pelas empresas
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="text-[#898B8F] flex h-[48px] px-4 w-full bg-white border-2 border-[#E8E8E8] rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="text-gray-400" />
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleFilterClick("aguardando")}
                className={`border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors ${activeFilter === "aguardando" ? "bg-[#1D71B8] text-white border-[#1D71B8]" : "bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50"}`}
              >
                Aguardando Revisão
              </button>
              <button
                onClick={() => handleFilterClick("aprovada")}
                className={`border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors ${activeFilter === "aprovada" ? "bg-[#1D71B8] text-white border-[#1D71B8]" : "bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50"}`}
              >
                Aprovados
              </button>
              <button
                onClick={() => handleFilterClick("reprovada")}
                className={`border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors ${activeFilter === "reprovada" ? "bg-[#1D71B8] text-white border-[#1D71B8]" : "bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50"}`}
              >
                Reprovados
              </button>
            </div>
            <hr className=" border-[#DBDBDB]" />
          </div>

          <div className="bg-white flex flex-col border border-[#E5E7EB] rounded-[6px] overflow-hidden shadow">
            <div className="flex items-center h-[36px] px-[21px] py-[11px] gap-6 self-stretch bg-[#F9FAFB]">
              <div className="w-[260px]"><span className="font-sans text-[12px] font-semibold text-[#6A7282] ">EMPRESA</span></div>
              <div className="flex-1"><span className="font-sans text-[12px] font-semibold text-[#6A7282]">ONG</span></div>
              <div className="w-[160px]"><span className="font-sans text-[12px] font-semibold text-[#6A7282]">DOAÇÃO</span></div>
              <div className="w-[80px]"><span className="font-sans text-[12px] font-semibold text-[#6A7282]">DATA</span></div>
              <div className="w-[146px]"><span className="font-sans text-[12px] font-semibold text-[#6A7282]">STATUS</span></div>
              <div className="w-[125px]"><span className="font-sans text-[12px] font-semibold text-[#6A7282]">AÇÃO</span></div>
            </div>
            <div className="flex flex-col rounded-b-lg shadow">
              {filteredAuditorias.map((auditoria) => (
                <RowAuditoria key={auditoria.id} {...auditoria} onClick={() => openModal(auditoria)} />
              ))}
            </div>
          </div>
        </div>

        <ModalRevisao 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          auditoria={selectedAuditoria}
          onSuccess={handleUpdateStatus}
        />
      </main>

      <Rodape />
    </div>
  );
}