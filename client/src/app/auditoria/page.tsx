"use client";
import { useState } from "react";
import RowAuditoria, {
  type RowAuditoriaProps,
} from "@/components/row-auditoria";
import ModalRevisao from "@/components/modal-revisao";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import { Search } from "lucide-react";

const minhasAuditorias: (RowAuditoriaProps & { acao: string })[] = [
  {
    id: "aud1",
    nomeEmpresa: "Empresa ABC Construções Recife",
    emailEmpresa: "contato@empresaabc.com",
    nomeONG: "ONG Esperança de Jaboatão",
    tipoDoacao: "Alimentos não perecíveis",
    valorDoacao: "500Kg",
    dataDoacao: "2025-06-10T10:00:00Z",
    status: "aguardando",
    documentos: [
      {
        id: "doc1_1",
        nome: "Nota_Fiscal_Compra.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-10T10:00:00Z",
        url: "#",
      },
      {
        id: "doc1_2",
        nome: "Comprovante_Entrega.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-10T10:00:00Z",
        url: "#",
      },
      {
        id: "doc1_3",
        nome: "Nota_Fiscal_Compra.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-10T10:00:00Z",
        url: "#",
      },
      {
        id: "doc1_4",
        nome: "Comprovante_Entrega.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-10T10:00:00Z",
        url: "#",
      },
      {
        id: "doc1_5",
        nome: "Nota_Fiscal_Compra.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-10T10:00:00Z",
        url: "#",
      },
      {
        id: "doc1_6",
        nome: "Comprovante_Entrega.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-10T10:00:00Z",
        url: "#",
      },
    ],
    acao: "Doação de Alimentos",
  },
  {
    id: "aud2",
    nomeEmpresa: "Tecnologia Avançada LTDA",
    emailEmpresa: "suporte@tecavancada.com.br",
    nomeONG: "Mundo Melhor",
    tipoDoacao: "Equipamentos Eletrônicos",
    valorDoacao: "15 Monitores",
    dataDoacao: "2025-06-09T15:30:00Z",
    status: "aprovada",
    documentos: [
      {
        id: "doc2_1",
        nome: "Nota_Fiscal_Monitores.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-09T15:30:00Z",
        url: "#",
      },
    ],
    acao: "Doação de Equipamentos",
  },
  {
    id: "aud3",
    nomeEmpresa: "Comércio Varejista S.A.",
    emailEmpresa: "vendas@varejistasa.com",
    nomeONG: "Apoio Comunitário",
    tipoDoacao: "Roupas de Inverno",
    valorDoacao: "200 Unidades",
    dataDoacao: "2025-06-08T11:00:00Z",
    status: "reprovada",
    documentos: [
      {
        id: "doc3_1",
        nome: "Declaracao_Doacao.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-08T11:00:00Z",
        url: "#",
      },
      {
        id: "doc3_2",
        nome: "Relacao_Itens.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-08T11:00:00Z",
        url: "#",
      },
      {
        id: "doc3_3",
        nome: "Comprovante_Coleta.pdf",
        tipo: "PDF",
        dataEnvio: "2025-06-08T11:00:00Z",
        url: "#",
      },
    ],
    acao: "Doação de Roupas",
    motivoReprovacao:
      "A nota fiscal apresentada não corresponde aos itens listados na declaração de doação. Por favor, envie o documento correto para uma nova análise.",
  },
];

export default function AuditoriaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuditoria, setSelectedAuditoria] = useState<
    (RowAuditoriaProps & { acao?: string }) | null
  >(null);
  const [activeFilter, setActiveFilter] = useState("aguardando");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuditorias = minhasAuditorias.filter((auditoria) => {
    const statusMatch =
      activeFilter === "todos" ||
      auditoria.status.toLowerCase() === activeFilter.toLowerCase();
    const searchMatch =
      auditoria.nomeEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auditoria.nomeONG.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleFilterClick = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter("todos");
    } else {
      setActiveFilter(filterName);
    }
  };

  function openModal(auditoria: RowAuditoriaProps & { acao?: string }) {
    setSelectedAuditoria(auditoria);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="bg-[#F5F5F5] flex flex-col min-h-screen">
      <Navbar variant="logout" onLogout={() => alert("Saindo...")} />

      <main className="px-[52px] py-8 flex-grow gap-9">
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
                className={`
                  border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors
                  ${
                    activeFilter === "aguardando"
                      ? "bg-[#1D71B8] text-white border-[#1D71B8]"
                      : "bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50"
                  }
                `}
              >
                Aguardando Revisão
              </button>

              <button
                onClick={() => handleFilterClick("aprovada")}
                className={`
                  border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors
                  ${
                    activeFilter === "aprovada"
                      ? "bg-[#1D71B8] text-white border-[#1D71B8]"
                      : "bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50"
                  }
                `}
              >
                Aprovados
              </button>

              <button
                onClick={() => handleFilterClick("reprovada")}
                className={`
                  border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors
                  ${
                    activeFilter === "reprovada"
                      ? "bg-[#1D71B8] text-white border-[#1D71B8]"
                      : "bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50"
                  }
                `}
              >
                Reprovados
              </button>
            </div>

            <hr className=" border-[#DBDBDB]" />
          </div>

          <div className="bg-white flex flex-col border border-[#E5E7EB] rounded-[6px] overflow-hidden shadow">
            <div className="flex items-center h-[36px] px-[21px] py-[11px] gap-6 self-stretch bg-[#F9FAFB]">
              <div className="w-[260px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282] ">
                  EMPRESA
                </span>
              </div>

              <div className="flex-1">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">
                  ONG
                </span>
              </div>

              <div className="w-[160px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">
                  DOAÇÃO
                </span>
              </div>

              <div className="w-[80px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">
                  DATA
                </span>
              </div>

              <div className="w-[146px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">
                  STATUS
                </span>
              </div>

              <div className="w-[125px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">
                  AÇÃO
                </span>
              </div>
            </div>
            <div className="flex flex-col rounded-b-lg shadow">
              {filteredAuditorias.map((auditoria) => (
                <RowAuditoria
                  key={auditoria.id}
                  {...auditoria}
                  onClick={() => openModal(auditoria)}
                />
              ))}
            </div>
          </div>
        </div>

        <ModalRevisao
          isOpen={isModalOpen}
          onClose={closeModal}
          auditoria={selectedAuditoria}
        />
      </main>

      <Rodape />
    </div>
  );
}
