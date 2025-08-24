import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ODS_NAME_TO_ID } from "@/types/acao";

export interface propspopup {
  acaoId?: number;
  nomeacao: string;
  descricao?: string;
  nomedaong: string;
  emailong: string;
  numeroong: string;
  odsNomes?: string[];
  odsAcao?: number[]; // ids das ODS (opcional, vindo do grid)
  onEntrarContato: () => void; // usado como 'onClose'
}

// helper: keep only digits
const digitsOnly = (s?: string) => (s ?? "").toString().replace(/\D/g, "");

// build whatsapp link or "#" se inválido
const buildWhatsappLink = (
  number?: string,
  orgName?: string,
  actionName?: string
) => {
  const n = digitsOnly(number);
  if (!n) return "#";
  const text = `Olá ${orgName ?? ""}, quero saber mais sobre "${
    actionName ?? ""
  }"`;
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
};

// build Gmail compose link ou "#" se inválido
const buildGmailLink = (
  email?: string,
  orgName?: string,
  actionName?: string
) => {
  if (!email || !email.includes("@")) return "#";
  const subject = `Sobre a ação: ${actionName ?? ""}`;
  const body = `Olá ${orgName ?? ""},

Gostaria de saber mais sobre a ação "${actionName ?? ""}".

Atenciosamente.`;
  const params = new URLSearchParams({
    to: email,
    su: subject,
    body: body,
  });
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
};

export default function Modalcontatos(props: propspopup) {
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onEntrarContato();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [props]);

  if (typeof window === "undefined") return null;

  const gmailHref = buildGmailLink(
    props.emailong,
    props.nomedaong,
    props.nomeacao
  );
  const waHref = buildWhatsappLink(
    props.numeroong,
    props.nomedaong,
    props.nomeacao
  );

  const mailDisabled = gmailHref === "#";
  const waDisabled = waHref === "#";

  const API_BASE = (
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  // envia métrica simples (não falha a UI em caso de erro)
  const handleConfirmContact = async () => {
    setSending(true);
    try {
      // Normaliza empresaId: primeiro localStorage (dev), depois env NEXT_PUBLIC_DEFAULT_EMPRESA_ID, por fim fallback 1
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem("empresaId")
          : null;
      const empresaId =
        (stored && Number(stored)) ||
        Number(process.env.NEXT_PUBLIC_DEFAULT_EMPRESA_ID || "1");

      // Preferir ids já disponíveis (props.odsAcao). Se não houver, mapear odsNomes -> ids
      const odsIds =
        (Array.isArray(props.odsAcao) && props.odsAcao.length
          ? props.odsAcao
          : (props.odsNomes ?? [])
              .map((n) => ODS_NAME_TO_ID[n])
              .filter((v): v is number => typeof v === "number")) || [];

      const payload: Record<string, any> = {
        nome: props.nomeacao ?? "",
        descricao: props.descricao ?? "",
        nomeOng: props.nomedaong ?? "",
        emailOng: props.emailong ?? "",
        telefoneOng: props.numeroong ?? "",
        empresaId,
        odsAcao: odsIds,
      };

      if (props.acaoId != null) {
        payload.acaoId = Number(props.acaoId);
      }

      // Somente tenta criar se tiver acaoId
      if (payload.acaoId) {
        const url = `${API_BASE}/action-company`;
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => "");
          console.warn("POST /action-company failed:", resp.status, text);
        }
      } else {
        console.warn(
          "handleConfirmContact: acaoId ausente — não enviando /action-company"
        );
      }
    } catch (e) {
      console.warn("Erro em handleConfirmContact:", e);
    } finally {
      setSending(false);
      props.onEntrarContato();
    }
  };

  const commonBlockClasses =
    "flex items-center justify-between p-3 border rounded transition-colors duration-150";

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Entrar em contato"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={props.onEntrarContato}
      />

      {/* content */}
      <div className="relative z-10">
        <div className="w-[450px] max-h-[90vh] overflow-auto flex flex-col bg-white rounded-lg shadow p-[22px] font-sans text-[#1B2029]">
          {/* Cabeçalho com título e descrição */}
          <div>
            <div className="text-[18px] font-bold mb-1">{props.nomeacao}</div>
            {props.descricao ? (
              <div className="text-sm text-gray-600 mb-2">
                {props.descricao}
              </div>
            ) : null}
            <div className="text-sm text-gray-700">
              ONG: {props.nomedaong || "-"}
            </div>
          </div>

          {/* Blocos de contato: Email e WhatsApp */}
          <div className="mt-4 grid gap-3">
            {/* Email - container clicável quando houver link */}
            {!mailDisabled ? (
              <a
                href={gmailHref}
                target="_blank"
                rel="noreferrer"
                role="group"
                aria-label="Contato por email"
                className={`w-[400px] h-[60px] bg-white flex items-center justify-between border-[1px] mt-[5px] rounded-lg border-gray-200 hover:bg-[#F2F2F2EE] ${
                  mailDisabled
                    ? "pointer-events-none opacity-60"
                    : "cursor-pointer"
                }`}
              >
                <div className="pl-4">
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-600">
                    {props.emailong || "-"}
                  </div>
                </div>
              </a>
            ) : (
              <div
                role="group"
                aria-label="Contato por email"
                className={`w-[400px] h-[60px] bg-white flex items-center justify-between border-[1px] mt-[5px] rounded-lg border-gray-200 opacity-50`}
                aria-disabled
              >
                <div className="pl-4">
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-600">
                    {props.emailong || "-"}
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp - container clicável quando houver link */}
            {!waDisabled ? (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                role="group"
                aria-label="Contato por whatsapp"
                className={`w-[400px] h-[60px] bg-white flex items-center justify-between border-[1px] mt-[5px] rounded-lg border-gray-200 hover:bg-[#F2F2F2EE] ${
                  waDisabled
                    ? "pointer-events-none opacity-60"
                    : "cursor-pointer"
                }`}
              >
                <div className="pl-4">
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-sm text-gray-600">
                    {props.numeroong || "-"}
                  </div>
                </div>
              </a>
            ) : (
              <div
                role="group"
                aria-label="Contato por whatsapp"
                className={`w-[400px] h-[60px] bg-white flex items-center border-[1px] mt-[5px] rounded-lg border-gray-200 opacity-50`}
                aria-disabled
              >
                <div className="pl-4">
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-sm text-gray-600">
                    {props.numeroong || "-"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ações - cancelar / confirmar */}
          <div className="flex mt-[12px]">
            <button
              className="h-[40px] w-[190px] border-gray-200 border-[1px] rounded-md flex items-center justify-center text-[16px] cursor-pointer"
              onClick={props.onEntrarContato}
            >
              Cancelar
            </button>

            <button
              className="h-[40px] w-[190px] ml-[20px] rounded-md flex items-center justify-center bg-[#009FE3] text-[16px] text-white cursor-pointer"
              onClick={handleConfirmContact}
              title="Confirmar contato"
              disabled={sending}
            >
              {sending ? "Enviando..." : "Confirmar contato"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
