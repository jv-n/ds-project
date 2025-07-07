"use client";
import { useState } from "react";
import RowAuditoria, { type RowAuditoriaProps } from "@/components/row-auditoria";
// 1. Importe o seu novo componente de modal
import ModalRevisao from "@/components/modal-revisao";

// Assumindo que a interface RowAuditoriaProps já foi atualizada para incluir 'acao'
const minhasAuditorias: (RowAuditoriaProps & { acao: string; })[] = [
  {
    id: 'aud1',
    nomeEmpresa: 'Empresa ABC Construções Recife',
    emailEmpresa: 'contato@empresaabc.com',
    nomeONG: 'ONG Esperança de Jaboatão',
    tipoDoacao: 'Alimentos não perecíveis',
    valorDoacao: '500Kg',
    dataDoacao: '2025-06-10T10:00:00Z',
    status: 'aguardando',
    documentos: [
      { id: 'doc1_1', nome: 'Nota_Fiscal_Compra.pdf', tipo: 'PDF', dataEnvio: '2025-06-10T10:00:00Z', url: '#' },
      { id: 'doc1_2', nome: 'Comprovante_Entrega.pdf', tipo: 'PDF', dataEnvio: '2025-06-10T10:00:00Z', url: '#' },
      { id: 'doc1_3', nome: 'Nota_Fiscal_Compra.pdf', tipo: 'PDF', dataEnvio: '2025-06-10T10:00:00Z', url: '#' },
      { id: 'doc1_4', nome: 'Comprovante_Entrega.pdf', tipo: 'PDF', dataEnvio: '2025-06-10T10:00:00Z', url: '#' },
      { id: 'doc1_5', nome: 'Nota_Fiscal_Compra.pdf', tipo: 'PDF', dataEnvio: '2025-06-10T10:00:00Z', url: '#' },
      { id: 'doc1_6', nome: 'Comprovante_Entrega.pdf', tipo: 'PDF', dataEnvio: '2025-06-10T10:00:00Z', url: '#' },
    ],
    acao: "Doação de Alimentos",
  },
  {
    id: 'aud2',
    nomeEmpresa: 'Tecnologia Avançada LTDA',
    emailEmpresa: 'suporte@tecavancada.com.br',
    nomeONG: 'Mundo Melhor',
    tipoDoacao: 'Equipamentos Eletrônicos',
    valorDoacao: '15 Monitores',
    dataDoacao: '2025-06-09T15:30:00Z',
    status: 'aprovada',
    documentos: [
      { id: 'doc2_1', nome: 'Nota_Fiscal_Monitores.pdf', tipo: 'PDF', dataEnvio: '2025-06-09T15:30:00Z', url: '#' },
    ],
    acao: "Doação de Equipamentos",
  },
  {
    id: 'aud3',
    nomeEmpresa: 'Comércio Varejista S.A.',
    emailEmpresa: 'vendas@varejistasa.com',
    nomeONG: 'Apoio Comunitário',
    tipoDoacao: 'Roupas de Inverno',
    valorDoacao: '200 Unidades',
    dataDoacao: '2025-06-08T11:00:00Z',
    status: 'reprovada',
    documentos: [
      { id: 'doc3_1', nome: 'Declaracao_Doacao.pdf', tipo: 'PDF', dataEnvio: '2025-06-08T11:00:00Z', url: '#' },
      { id: 'doc3_2', nome: 'Relacao_Itens.pdf', tipo: 'PDF', dataEnvio: '2025-06-08T11:00:00Z', url: '#' },
      { id: 'doc3_3', nome: 'Comprovante_Coleta.pdf', tipo: 'PDF', dataEnvio: '2025-06-08T11:00:00Z', url: '#' },
    ],
    acao: "Doação de Roupas",
  },
];

export default function AuditoriaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuditoria, setSelectedAuditoria] = useState<(RowAuditoriaProps & { acao?: string; }) | null>(null);

  function openModal(auditoria: RowAuditoriaProps & { acao?: string; }) {
    setSelectedAuditoria(auditoria);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Painel de Auditoria
      </h1>
      <div className="flex flex-col overflow-hidden rounded-lg shadow">
        {minhasAuditorias.map((auditoria) => (
          <RowAuditoria
            key={auditoria.id}
            {...auditoria}
            onClick={() => openModal(auditoria)}
          />
        ))}
      </div>

      {/* 2. Renderize o modal aqui, passando os estados e funções como props */}
      <ModalRevisao 
        isOpen={isModalOpen}
        onClose={closeModal}
        auditoria={selectedAuditoria}
      />
    </main>
  );
}