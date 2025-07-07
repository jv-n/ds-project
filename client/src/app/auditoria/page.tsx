"use client";
import RowAuditoria, { type RowAuditoriaProps } from "@/components/row-auditoria";

const auditoriasFicticias: RowAuditoriaProps[] = [
  {
    id: 'aud1',
    nomeEmpresa: 'Empresa ABC Construções Recife',
    emailEmpresa: 'contato@empresaabc.com',
    nomeONG: 'ONG Esperança de Jaboatão',
    tipoDoacao: 'Alimentos não perecíveis',
    valorDoacao: '500Kg',
    dataDoacao: '2025-06-10T10:00:00Z',
    status: 'aguardando',
    onClick: () => alert('Revisando doação da Empresa ABC'),
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
    onClick: () => alert('Revisando doação da Tec Avançada'),
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
    onClick: () => alert('Revisando doação do Comércio Varejista'),
  },
];

export default function AuditoriaPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Painel de Auditoria
      </h1>
      <div className="flex flex-col overflow-hidden rounded-lg shadow">
        {auditoriasFicticias.map((auditoria) => (
          <RowAuditoria
            key={auditoria.id}
            {...auditoria}
          />
        ))}
      </div>
    </main>
  );
}