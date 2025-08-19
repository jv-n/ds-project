// client/src/components/confirmar-contato-button.tsx
"use client";

import React, { useState } from "react";
import { linkActionToCompany } from "../../services/actionCompany";

type Props = {
  actionId: number | string;
  // opcional: callback para atualizar a UI (fechar modal, remover card, etc.)
  onSuccess?: () => void;
  // opcional: personalizar o rótulo do botão
  label?: string;
};

// ID mockado da empresa (troque quando integrar login)
const MOCK_COMPANY_ID = 999;

export default function ConfirmarContatoButton({
  actionId,
  onSuccess,
  label = "Confirmar contato",
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await linkActionToCompany({ actionId, companyId: MOCK_COMPANY_ID });
      // feedback simples (substitua por toast do seu design system, se tiver)
      alert("Contato confirmado com sucesso!");
      onSuccess?.();
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Falha ao confirmar contato.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8 }}>
      <button
        onClick={handleClick}
        disabled={submitting}
        className="px-3 py-2 rounded-md bg-violet-600 text-white"
      >
        {submitting ? "Enviando..." : label}
      </button>
      {error && (
        <span
          className="text-sm"
          style={{ color: "tomato", maxWidth: 360, whiteSpace: "pre-wrap" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
