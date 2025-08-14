'use client';

import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { X, File, Download, CheckCircle2, XCircle } from 'lucide-react';
import { type RowAuditoriaProps } from '@/components/row-auditoria';
import Chip from '@/components/chip-status';

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

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
    documentos: [],
    acao: api.acao ?? api.action ?? undefined,
    motivoReprovacao: api.motivoReprovacao ?? api.rejectReason ?? api.reason ?? null,
  };
}

type Documento = {
  id: string;
  nome: string;
  tipo: string;
  dataEnvio: string;
  url: string;
};

interface ModalRevisaoProps {
  isOpen: boolean;
  onClose: () => void;
  auditoria: (RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null }) | null;
  onUpdated?: (updated: RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null }) => void;
}

export default function ModalRevisao({
  isOpen,
  onClose,
  auditoria,
  onUpdated,
}: ModalRevisaoProps) {
  const [isReproving, setIsReproving] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [docs, setDocs] = useState<Documento[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  // Carrega documentos do backend quando o modal abrir
  useEffect(() => {
    if (!isOpen || !auditoria?.id) return;

    let cancelled = false;
    const controller = new AbortController();
    (async () => {
      try {
        setLoadingDocs(true);
        const url = `${BASE_URL}/donations/${auditoria.id}/audit/documents/`;
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          
          setDocs(
            (auditoria.documentos || []).map((d) => ({
              id: d.id,
              nome: d.nome,
              tipo: d.tipo,
              dataEnvio: d.dataEnvio,
              url: d.url || `${BASE_URL}/donations/${auditoria.id}/audit/documents/${d.id}`,
            }))
          );
          return;
        }
        const data = (await res.json()) as any[];
        if (cancelled) return;
        const mapped =
          (data || []).map((f: any) => ({
            id: f.id ?? f._id ?? f.name,
            nome: f.nome ?? f.name ?? 'Documento',
            tipo: f.tipo ?? f.type ?? 'Arquivo',
            dataEnvio: f.dataEnvio ?? f.uploadedAt ?? new Date().toISOString(),
            url: `${BASE_URL}/donations/${auditoria.id}/audit/documents/${f.id ?? f._id ?? f.name}`,
          })) ?? [];
        setDocs(mapped);
      } catch {
        // mantém documentos existentes (se houver)
        setDocs(
          (auditoria.documentos || []).map((d) => ({
            id: d.id,
            nome: d.nome,
            tipo: d.tipo,
            dataEnvio: d.dataEnvio,
            url: d.url || `${BASE_URL}/donations/${auditoria.id}/audit/documents/${d.id}`,
          }))
        );
      } finally {
        setLoadingDocs(false);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [isOpen, auditoria?.id]);

  if (!isOpen || !auditoria) return null;

  const formattedDate = useMemo(
    () => format(new Date(auditoria.dataDoacao), 'dd/MM/yyyy'),
    [auditoria.dataDoacao]
  );

  const handleClose = () => {
    setIsReproving(false);
    setMotivo('');
    onClose();
  };

  async function handleAprovar() {
    try {
      setSubmitting(true);
      const res = await fetch(
        `${BASE_URL}/donations/${auditoria.id}/audit/approve/`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!res.ok) {
        let body: any = null;
        try {
          body = await res.json();
        } catch {}
        throw new Error(body?.message || body?.error || `HTTP ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const updated = normalizeDonation(data);
      onUpdated?.({ ...auditoria, ...updated });
      handleClose();
    } catch (e) {
      alert((e as Error).message || 'Erro ao aprovar auditoria');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReprovar() {
    if (!motivo.trim()) {
      alert('Informe um motivo para reprovação.');
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch(
        `${BASE_URL}/donations/${auditoria.id}/audit/reject/`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: motivo.trim() }),
        }
      );
      if (!res.ok) {
        let body: any = null;
        try {
          body = await res.json();
        } catch {}
        throw new Error(body?.message || body?.error || `HTTP ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const updated = normalizeDonation(data);
      onUpdated?.({ ...auditoria, ...updated, motivoReprovacao: updated.motivoReprovacao ?? motivo.trim() });
      handleClose();
    } catch (e) {
      alert((e as Error).message || 'Erro ao reprovar auditoria');
    } finally {
      setSubmitting(false);
    }
  }

  const renderDetailsAndDocuments = () => (
    <>
      <div className="flex gap-3 p-4 bg-[#F9FAFB] rounded-[6px]">
        <div className="flex flex-col gap-1.5 items-start w-1/2">
          <h3 className="font-sans text-[14px] font-semibold text-[#101828]">
            Detalhes da Doação
          </h3>
          <div className="text-left">
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">Empresa:</span> {auditoria.nomeEmpresa}
            </p>
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">Email:</span> {auditoria.emailEmpresa}
            </p>
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">ONG Beneficiada:</span> {auditoria.nomeONG}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-start w-1/2">
          <h3 className="font-sans text-[14px] font-semibold text-[#101828]">
            Informações da Doação
          </h3>
          <div className="text-left">
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">Ação:</span> {auditoria.acao || 'Não informado'}
            </p>
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">Tipo:</span> {auditoria.tipoDoacao}
            </p>
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">Valor/Quantidade:</span> {auditoria.valorDoacao}
            </p>
            <p className="font-sans text-[14px] text-[#0A0A0A]">
              <span className="font-semibold">Data:</span> {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <h4 className="font-sans text-[16px] font-semibold text-[#101828]">
          Documentos Anexados {loadingDocs ? '(carregando...)' : `(${docs.length})`}
        </h4>
        <div className="flex flex-col gap-2.5 h-full overflow-y-auto pr-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-md"
            >
              <div className="flex items-center gap-3">
                <File size={18} className="text-[#6A7282]" />
                <div className="flex flex-col">
                  <span className="font-sans text-sm text-[#101828]">{doc.nome}</span>
                  <span className="font-sans text-xs text-[#6A7282]">
                    {doc.tipo} • {new Date(doc.dataEnvio).toLocaleString()}
                  </span>
                </div>
              </div>
              <a
                className="text-[#1D71B8] flex items-center gap-1 text-sm hover:underline"
                href={doc.url}
                target="_blank"
                rel="noreferrer"
              >
                <Download size={16} /> Baixar
              </a>
            </div>
          ))}
          {!loadingDocs && docs.length === 0 && (
            <div className="text-sm text-[#6A7282]">Nenhum documento encontrado.</div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Chip status={auditoria.status} />
            <h2 className="font-sans text-lg font-semibold text-[#101828]">
              {auditoria.status === 'aguardando'
                ? 'Revisar Documentação'
                : 'Detalhes da Auditoria'}
            </h2>
          </div>
          <button onClick={handleClose} aria-label="Fechar">
            <X />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6 overflow-hidden">
          {auditoria.status === 'reprovada' && (
            <div className="flex flex-col gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-sans text-[14px] font-semibold text-red-800 flex items-center gap-2">
                <XCircle size={16} /> Documentação Reprovada
              </h4>
              <p className="font-sans text-sm text-red-700">
                {auditoria.motivoReprovacao || 'Nenhum motivo foi fornecido.'}
              </p>
            </div>
          )}

          {auditoria.status === 'aprovada' && (
            <div className="flex flex-col gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-sans text-[14px] font-semibold text-green-800 flex items-center gap-2">
                <CheckCircle2 size={16} /> Documentação Aprovada
              </h4>
              <p className="font-sans text-sm text-green-700">
                Todos os documentos foram verificados e aprovados com sucesso.
              </p>
            </div>
          )}

          {renderDetailsAndDocuments()}

          {auditoria.status === 'aguardando' && (
            <div className="flex flex-col gap-3 border-t pt-4">
              {isReproving && (
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-sm text-[#101828]">
                    Motivo da reprovação
                  </label>
                  <textarea
                    className="w-full min-h-[96px] p-3 border border-[#E5E7EB] rounded-md"
                    placeholder="Descreva o motivo..."
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  />
                </div>
              )}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  className="px-4 py-2 rounded-md border border-[#E5E7EB] text-[#101828] bg-white hover:bg-gray-50 disabled:opacity-60"
                >
                  Cancelar
                </button>
                {!isReproving && (
                  <button
                    onClick={() => setIsReproving(true)}
                    disabled={submitting}
                    className="px-4 py-2 rounded-md border border-red-200 text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
                  >
                    Reprovar
                  </button>
                )}
                {isReproving && (
                  <button
                    onClick={handleReprovar}
                    disabled={submitting}
                    className="px-4 py-2 rounded-md border border-red-200 text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
                  >
                    Confirmar Reprovação
                  </button>
                )}
                <button
                  onClick={handleAprovar}
                  disabled={submitting}
                  className="px-4 py-2 rounded-md border border-[#1D71B8] text-white bg-[#1D71B8] hover:bg-blue-700 disabled:opacity-60"
                >
                  Aprovar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}