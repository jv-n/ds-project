"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { X, File, Download, CheckCircle2, XCircle } from "lucide-react";
import { type RowAuditoriaProps } from "@/components/row-auditoria";
import Chip from "@/components/chip-status";

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
  /\/$/,
  ""
);

const mapStatusFromApi = (s?: string): RowAuditoriaProps["status"] => {
  if (!s) return "aguardando";
  const low = s.toLowerCase();
  if (low.startsWith("pend")) return "aguardando";
  if (low.startsWith("approv") || low.startsWith("aprov")) return "aprovada";
  if (low.startsWith("reject") || low.startsWith("reprov")) return "reprovada";
  return "aguardando";
};

function normalizeDonation(
  api: any
): RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null } {
  return {
    id: api.id ?? api._id,
    nomeEmpresa: api.nomeEmpresa ?? api.companyName ?? api.company ?? "",
    emailEmpresa: api.emailEmpresa ?? api.companyEmail ?? api.email ?? "",
    nomeONG: api.nomeONG ?? api.ngoName ?? api.organization ?? "",
    tipoDoacao: api.tipoDoacao ?? api.donationType ?? "",
    valorDoacao: api.valorDoacao ?? api.donationValue ?? "",
    dataDoacao:
      api.dataDoacao ??
      api.donationDate ??
      api.createdAt ??
      new Date().toISOString(),
    status: mapStatusFromApi(api.status),
    documentos: [],
    acao: api.acao ?? api.action ?? undefined,
    motivoReprovacao:
      api.motivoReprovacao ?? api.rejectReason ?? api.reason ?? null,
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
  auditoria:
    | (RowAuditoriaProps & { acao?: string; motivoReprovacao?: string | null })
    | null;
  onUpdated?: (
    updated: RowAuditoriaProps & {
      acao?: string;
      motivoReprovacao?: string | null;
    }
  ) => void;
}

export default function ModalRevisao({
  isOpen,
  onClose,
  auditoria,
  onUpdated,
}: ModalRevisaoProps) {
  const [isReproving, setIsReproving] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [docs, setDocs] = useState<Documento[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  useEffect(() => {
    if (!isOpen || !auditoria?.id) return;

    let cancelled = false;
    const controller = new AbortController();
    (async () => {
      try {
        setLoadingDocs(true);
        const url = `${BASE_URL}/donations/${auditoria.id}/audit/documents/`;
        // ⬇️ sem credentials e sem headers (GET simples)
        const res = await fetch(url, {
          method: "GET",
          signal: controller.signal,
        });
        if (!res.ok) {
          setDocs(
            (auditoria.documentos || []).map((d) => ({
              id: d.id,
              nome: d.nome,
              tipo: d.tipo,
              dataEnvio: d.dataEnvio,
              url:
                d.url ||
                `${BASE_URL}/donations/${auditoria.id}/audit/documents/${d.id}`,
            }))
          );
          return;
        }
        const data = (await res.json()) as any[];
        if (cancelled) return;
        const mapped =
          (data || []).map((f: any) => ({
            id: f.id ?? f._id ?? f.name,
            nome: f.nome ?? f.name ?? "Documento",
            tipo: f.tipo ?? f.type ?? "Arquivo",
            dataEnvio: f.dataEnvio ?? f.uploadedAt ?? new Date().toISOString(),
            url: `${BASE_URL}/donations/${auditoria.id}/audit/documents/${
              f.id ?? f._id ?? f.name
            }`,
          })) ?? [];
        setDocs(mapped);
      } catch {
        setDocs(
          (auditoria.documentos || []).map((d) => ({
            id: d.id,
            nome: d.nome,
            tipo: d.tipo,
            dataEnvio: d.dataEnvio,
            url:
              d.url ||
              `${BASE_URL}/donations/${auditoria.id}/audit/documents/${d.id}`,
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
    () => format(new Date(auditoria.dataDoacao), "dd/MM/yyyy"),
    [auditoria.dataDoacao]
  );

  const handleClose = () => {
    setIsReproving(false);
    setMotivo("");
    onClose();
  };

  async function handleAprovar() {
    try {
      setSubmitting(true);
      const res = await fetch(
        `${BASE_URL}/donations/${auditoria.id}/audit/approve/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        let body: any = null;
        try {
          body = await res.json();
        } catch {}
        throw new Error(
          body?.message || body?.error || `HTTP ${res.status} ${res.statusText}`
        );
      }
      const data = await res.json();
      const updated = normalizeDonation(data);
      onUpdated?.({ ...auditoria, ...updated });
      handleClose();
    } catch (e) {
      alert((e as Error).message || "Erro ao aprovar auditoria");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReprovar() {
    if (!motivo.trim()) {
      alert("Informe um motivo para reprovação.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch(
        `${BASE_URL}/donations/${auditoria.id}/audit/reject/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason: motivo.trim() }),
        }
      );
      if (!res.ok) {
        let body: any = null;
        try {
          body = await res.json();
        } catch {}
        throw new Error(
          body?.message || body?.error || `HTTP ${res.status} ${res.statusText}`
        );
      }
      const data = await res.json();
      const updated = normalizeDonation(data);
      onUpdated?.({
        ...auditoria,
        ...updated,
        motivoReprovacao: updated.motivoReprovacao ?? motivo.trim(),
      });
      handleClose();
    } catch (e) {
      alert((e as Error).message || "Erro ao reprovar auditoria");
    } finally {
      setSubmitting(false);
    }
  }

  const renderDetailsAndDocuments = () => <>{/* ... resto inalterado ... */}</>;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      {/* ... resto inalterado (UI do modal) ... */}
    </div>
  );
}
