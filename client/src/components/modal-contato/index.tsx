"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { balao, balaopopup, confirma, emailpopup } from "@/assets";
import { linkActionToCompany } from "@/services/actionCompany";

export interface propspopup {
  nomedaong: string;
  nomeacao: string;
  emailong: string;
  numeroong: string;
  onEntrarContato: () => void; // fecha o modal
  actionId: number | string; // <- ID da ação selecionada (vem do card/grid)
  onSuccess?: () => void; // <- opcional: atualizar UI após sucesso
}

const MOCK_COMPANY_ID = 999; // enquanto login não está integrado

function digitsOnly(s?: string) {
  return (s ?? "").replace(/\D/g, "");
}

function buildWhatsappLink(
  numero: string,
  nomedaong: string,
  nomeacao: string
) {
  const raw = digitsOnly(numero);
  if (!raw) return "#";
  const withDdi = raw.startsWith("55") ? raw : `55${raw}`;
  const text = `Olá ${nomedaong || ""}! Vi a ação "${
    nomeacao || ""
  }" no Bora Impactar e gostaria de entrar em contato.`;
  return `https://wa.me/${withDdi}?text=${encodeURIComponent(text)}`;
}

function buildGmailLink(email: string, nomedaong: string, nomeacao: string) {
  if (!email) return "#";
  const params = new URLSearchParams({
    to: email,
    su: `Contato sobre: ${nomeacao || ""}`,
    body: `Olá ${nomedaong || ""},

Vi a ação "${nomeacao || ""}" no Bora Impactar e gostaria de saber mais.

Obrigado(a)!`,
  });
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
}

export default function Modalcontatos(props: propspopup) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleConfirm() {
    try {
      setSubmitting(true);
      setError(null);

      // 🔴 POST: vincula a ação à empresa mockada
      await linkActionToCompany({
        actionId: props.actionId,
        companyId: MOCK_COMPANY_ID,
        // preencher campos requeridos pelo backend
        nome: props.nomeacao ?? "",
        descricao: "", // ajuste se quiser uma descrição padrão
        nomeOng: props.nomedaong ?? "",
        emailOng: props.emailong ?? "",
        telefoneOng: props.numeroong ?? "",
        odsAcao: [],
      });

      alert("Contato confirmado com sucesso!");
      props.onSuccess?.(); // permite o pai atualizar a UI (ex.: remover card)
      props.onEntrarContato(); // fecha o modal
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Falha ao confirmar contato.");
    } finally {
      setSubmitting(false);
    }
  }

  return createPortal(
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
        <div className="w-[450px] h-[auto] flex flex-col bg-white rounded-lg shadow p-[22px] font-sans text-[#1B2029]">
          <div className="flex">
            <Image src={balao} alt="" />
            <div className="text-[16px] ml-[5px]"> Entrar em contato</div>
          </div>

          <div className="text-[13px] text-[#717182] flex mt-[5px] flex-wrap">
            <div>Entre em contato com&nbsp;</div>
            <div className="font-bold">{props.nomedaong}</div>
            <div>&nbsp;sobre a ação&nbsp;</div>
            <div className="font-bold">{props.nomeacao}</div>
          </div>

          {/* Erro do POST */}
          {error && (
            <div
              className="mt-3 rounded-md bg-red-100 text-red-700 p-3 text-[13px]"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {error}
            </div>
          )}

          {/* CARD DE E-MAIL */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Enviar e-mail"
            onClick={() => {
              if (!mailDisabled)
                window.open(gmailHref, "_blank", "noopener,noreferrer");
            }}
            onKeyDown={(e) => {
              if (!mailDisabled && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                window.open(gmailHref, "_blank", "noopener,noreferrer");
              }
            }}
            className={`w-[400px] h-[64px] bg-white flex items-center justify-between border-[1px] mt-[5px] rounded-lg border-gray-200 hover:bg-[#F2F2F2EE] ${
              mailDisabled ? "pointer-events-none opacity-60" : "cursor-pointer"
            }`}
            title={mailDisabled ? "E-mail indisponível" : "Abrir Gmail"}
          >
            <div className="flex items-center">
              <Image src={emailpopup} alt="" className="ml-[10px]" />
              <div className="flex flex-col ml-[10px]">
                <div className="text-[12px] font-bold">Enviar e-mail</div>
                <div className="text-[13px] text-[#6A7282] font-bold">
                  {props.emailong || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={waDisabled}
            className={`w-[400px] h-[64px] bg-white flex items-center border-[1px] mt-[10px] rounded-lg border-gray-200 hover:bg-[#F2F2F2EE] ${
              waDisabled ? "pointer-events-none opacity-60" : "cursor-pointer"
            }`}
            title={waDisabled ? "WhatsApp indisponível" : "Abrir WhatsApp"}
          >
            <Image src={balaopopup} alt="" className="ml-[10px]" />
            <div className="flex flex-col ml-[10px]">
              <div className="text-[12px] font-bold">Enviar whatsapp</div>
              <div className="text-[13px] text-[#6A7282] font-bold">
                {props.numeroong || "—"}
              </div>
            </div>
          </a>

          <div className="bg-gray-200 w-[400px] h-[1px] mt-[14px]" />

          <div className="flex mt-[12px]">
            <button
              className="h-[40px] w-[190px] border-gray-200 border-[1px] rounded-md flex items-center justify-center text-[16px] cursor-pointer"
              onClick={props.onEntrarContato}
              disabled={submitting}
            >
              Cancelar
            </button>

            <button
              className="h-[40px] w-[190px] ml-[20px] rounded-md flex items-center justify-center bg-[#009FE3] text-[16px] text-white cursor-pointer disabled:opacity-60"
              onClick={handleConfirm}
              disabled={submitting || !props.actionId}
              title="Confirmar vínculo com a ONG"
            >
              <Image src={confirma} alt="" className="mr-[3px]" />
              {submitting ? "Enviando..." : "Confirmar contato"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
