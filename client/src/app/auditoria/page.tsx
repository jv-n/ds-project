'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import RowAuditoria, { type RowAuditoriaProps } from '@/components/row-auditoria';
import ModalRevisao from '@/components/modal-revisao';
import Navbar from '@/components/navbar';
import Rodape from '@/components/rodape';
import { Search } from 'lucide-react';

type FilterKey = 'aguardando' | 'aprovada' | 'reprovada' | 'todos';

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

const mapStatusToApi = (s?: FilterKey) => {
  if (!s || s === 'todos') return undefined;
  return s === 'aguardando' ? 'pending' : s === 'aprovada' ? 'approved' : 'rejected';
};
const mapStatusFromApi = (s?: string): RowAuditoriaProps['status'] => {
  if (!s) return 'aguardando';
  const low = s.toLowerCase();
  if (low.startsWith('pend')) return 'aguardando';
  if (low.startsWith('approv') || low.startsWith('aprov')) return 'aprovada';
  if (low.startsWith('reject') || low.startsWith('reprov')) return 'reprovada';
  return 'aguardando';
};

function normalizeDonation(api: any): RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null } {
  return {
    id: api.id ?? api._id,
    nomeEmpresa: api.nomeEmpresa ?? api.companyName ?? api.company ?? '',
    emailEmpresa: api.emailEmpresa ?? api.companyEmail ?? api.email ?? '',
    nomeONG: api.nomeONG ?? api.ngoName ?? api.organization ?? '',
    tipoDoacao: api.tipoDoacao ?? api.donationType ?? '',
    valorDoacao: api.valorDoacao ?? api.donationValue ?? '',
    dataDoacao: api.dataDoacao ?? api.donationDate ?? api.createdAt ?? new Date().toISOString(),
    status: mapStatusFromApi(api.status),
    documentos:
      api.documentos ??
      api.documents ??
      api.files?.map((f: any) => ({
        id: f.id ?? f._id ?? f.name,
        nome: f.nome ?? f.name ?? 'Documento',
        tipo: f.tipo ?? f.type ?? 'Arquivo',
        dataEnvio: f.dataEnvio ?? f.uploadedAt ?? api.updatedAt ?? new Date().toISOString(),
        url: f.url ?? `${BASE_URL}/donations/${api.id ?? api._id}/audit/documents/${f.id ?? f._id ?? f.name}`,
      })) ??
      [],
    acao: api.acao ?? api.action ?? undefined,
    motivoReprovacao: api.motivoReprovacao ?? api.rejectReason ?? api.reason ?? null,
  };
}

export default function AuditoriaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuditoria, setSelectedAuditoria] = useState<(RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null }) | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('aguardando');
  const [searchTerm, setSearchTerm] = useState('');
  const [auditorias, setAuditorias] = useState<(RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

 
  const handleFilterClick = (filterName: Exclude<FilterKey, 'todos'>) => {
    setActiveFilter((prev) => (prev === filterName ? 'todos' : filterName));
  };

  function openModal(auditoria: RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null }) {
    setSelectedAuditoria(auditoria);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const debouncedSearch = useDebouncedValue(searchTerm, 300);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const statusApi = mapStatusToApi(activeFilter);
        const path =
          statusApi
            ? `/donations/audit/status/${encodeURIComponent(statusApi)}/`
            : `/donations/audit/`;

        const url = `${BASE_URL}${path}`;
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          let body: any = null;
          try {
            body = await res.json();
          } catch {}
          throw new Error(body?.message || body?.error || `HTTP ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as any[];
        setAuditorias((Array.isArray(data) ? data : []).map(normalizeDonation));
      } catch (e: any) {
        if (e?.name === 'AbortError') return;
        setError(e?.message || 'Falha ao carregar auditorias.');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [activeFilter]);

  const filteredAuditorias = useMemo(() => {
    return auditorias.filter((auditoria) => {
      const statusMatch =
        activeFilter === 'todos' ||
        auditoria.status.toLowerCase() === activeFilter.toLowerCase();
      const searchMatch =
        auditoria.nomeEmpresa.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        auditoria.nomeONG.toLowerCase().includes(debouncedSearch.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [auditorias, activeFilter, debouncedSearch]);

  
  function handleUpdated(updated: RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null }) {
    setAuditorias((current) =>
      current.map((a) => (a.id === updated.id ? { ...a, ...updated } : a))
    );
  }

  return (
    <div className="bg-[#F5F5F5] flex flex-col min-h-screen">
      
      <Navbar ativo="sair" />

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
                onClick={() => handleFilterClick('aguardando')}
                className={`border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors ${
                  activeFilter === 'aguardando'
                    ? 'bg-[#1D71B8] text-white border-[#1D71B8]'
                    : 'bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50'
                }`}
              >
                Aguardando Revisão
              </button>

              <button
                onClick={() => handleFilterClick('aprovada')}
                className={`border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors ${
                  activeFilter === 'aprovada'
                    ? 'bg-[#1D71B8] text-white border-[#1D71B8]'
                    : 'bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50'
                }`}
              >
                Aprovados
              </button>

              <button
                onClick={() => handleFilterClick('reprovada')}
                className={`border rounded-3xl flex items-center px-3 py-1 text-[12px] font-medium transition-colors ${
                  activeFilter === 'reprovada'
                    ? 'bg-[#1D71B8] text-white border-[#1D71B8]'
                    : 'bg-white text-[#1D71B8] border-[#1D71B8] hover:bg-blue-50'
                }`}
              >
                Reprovados
              </button>
            </div>

            <hr className=" border-[#DBDBDB]" />
          </div>

          <div className="bg-white flex flex-col border border-[#E5E7EB] rounded-[6px] overflow-hidden shadow">
            <div className="flex items-center h-[36px] px-[21px] py-[11px] gap-6 self-stretch bg-[#F9FAFB]">
              <div className="w-[260px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282] ">EMPRESA</span>
              </div>

              <div className="flex-1">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">ONG</span>
              </div>

              <div className="w-[160px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">DOAÇÃO</span>
              </div>

              <div className="w-[80px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">DATA</span>
              </div>

              <div className="w-[146px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">STATUS</span>
              </div>

              <div className="w-[125px]">
                <span className="font-sans text-[12px] font-semibold text-[#6A7282]">AÇÃO</span>
              </div>
            </div>

            {loading && (
              <div className="p-6 text-sm text-[#6A7282]">Carregando auditorias...</div>
            )}
            {error && (
              <div className="p-6 text-sm text-red-600">Erro: {error}</div>
            )}

            {!loading && !error && (
              <div className="flex flex-col rounded-b-lg shadow">
                {filteredAuditorias.map((auditoria) => (
                  <RowAuditoria
                    key={auditoria.id}
                    {...auditoria}
                    onClick={() => openModal(auditoria)}
                  />
                ))}
                {filteredAuditorias.length === 0 && (
                  <div className="p-6 text-sm text-[#6A7282]">Nenhum resultado.</div>
                )}
              </div>
            )}
          </div>
        </div>

        <ModalRevisao
          isOpen={isModalOpen}
          onClose={closeModal}
          auditoria={selectedAuditoria}
          // Callback para refletir a aprovação/reprovação na lista
          onUpdated={handleUpdated}
        />
      </main>

      <Rodape />
    </div>
  );
}


function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}