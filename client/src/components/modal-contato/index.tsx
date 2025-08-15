"use client";
import React from "react";
import Image from "next/image";
import { balao, balaopopup, confirma, emailpopup } from "@/assets";

export interface propspopup {
  nomedaong: string;
  nomeacao: string;
  emailong: string;
  numeroong: string;
  onEntrarContato: () => void; // usado como 'onClose'
}

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
        <div className="w-[450px] h-[300px] flex flex-col bg-white rounded-lg shadow p-[22px] font-sans text-[#1B2029]">
          <div className="flex">
            <Image src={balao} alt="" />
            <div className="text-[16px] ml-[5px]"> Entrar em contato</div>
          </div>

      <div className="text-[13px] text-[#717182] flex mt-[5px] flex-wrap">
        <div>Entre em contato com &nbsp;</div>
        <div className="font-bold">{props.nomedaong}</div>
        <div>&nbsp; sobre a ação &nbsp;</div>
        <div className="font-bold">{props.nomeacao}</div>
      </div>

          {/* CARD DE E-MAIL — VISUAL IDÊNTICO, MAS O CLIQUE ABRE O GMAIL */}
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
            {/* esquerda: ícone + e-mail */}
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

      <div className="bg-gray-200 w-[400px] h-[1px] mt-[14px]"></div>

          <div className="flex mt-[12px]">
            <button
              className="h-[40px] w-[190px] border-gray-200 border-[1px] rounded-md flex items-center justify-center text-[16px] cursor-pointer"
              onClick={props.onEntrarContato}
            >
              Cancelar
            </button>

            <button
              className="h-[40px] w-[190px] ml-[20px] rounded-md flex items-center justify-center bg-[#009FE3] text-[16px] text-white cursor-pointer"
              onClick={props.onEntrarContato}
              title="Fechar"
            >
              <Image src={confirma} alt="" className="mr-[3px]" />
              Confirmar contato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
