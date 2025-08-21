"use client";

import React, { useEffect, useMemo, useState } from "react";
import Cardacao, { Cardacaoprops } from "@/components/card-de-acao";
import Modalcontatos from "@/components/modal-contato";
import { ODS_NAME_TO_ID } from "@/types/acao";

type OdsApi = { id?: number; name?: string };
type OngApi = {
  name?: string;
  contact_email?: string;
  contact_phone?: string;
};
type ActionApi = {
  id?: number;
  acaoId?: number;
  title?: string;
  short_description?: string;
  description?: string;
  whatsapp_contact?: string;
  ong?: OngApi;
  sustainable_development_goals?: OdsApi[];
};

type Props = {
  searchText: string;
  odsFilters: string[]; // nomes (ex.: "Educação de Qualidade")
};

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

const safeLower = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function GridAcoes({ searchText, odsFilters }: Props) {
  const [modalAberto, setModalAberto] = useState(false);
  const [acaoSelecionada, setAcaoSelecionada] = useState<Omit<
    Cardacaoprops,
    "onEntrarContato"
  > | null>(null);

  const [acoes, setAcoes] = useState<ActionApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const odsIds = useMemo(
    () =>
      odsFilters
        .map((n) => ODS_NAME_TO_ID[n])
        .filter((v): v is number => typeof v === "number"),
    [odsFilters]
  );

  const [debouncedText, setDebouncedText] = useState(searchText);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedText(searchText), 250);
    return () => clearTimeout(t);
  }, [searchText]);

  useEffect(() => {
    let cancelado = false;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErro(null);

        const qs = new URLSearchParams();
        if (debouncedText.trim()) qs.set("search", debouncedText.trim());
        if (odsIds.length) qs.set("ods", odsIds.join(","));

        const url = `${BASE || "http://localhost:3001"}/action-company${
          qs.toString() ? `?${qs.toString()}` : ""
        }`;

        const resp = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => "");
          throw new Error(`Erro ${resp.status}${text ? `: ${text}` : ""}`);
        }

        const raw = await resp.json();

        // Normalize many possible shapes:
        // - [] (array of actions)
        // - [{ actions: [...] }, ...]
        // - { actions: [...] }
        // - { data: { items: [...] } } (generic)
        let list: ActionApi[] = [];

        if (Array.isArray(raw)) {
          // if array of wrappers e.g. [{ actions: [...] }]
          const first = raw[0];
          if (first && Array.isArray(first.actions)) {
            list = first.actions as ActionApi[];
          } else {
            list = raw as ActionApi[];
          }
        } else if (raw && typeof raw === "object") {
          if (Array.isArray(raw.actions)) list = raw.actions as ActionApi[];
          else if (Array.isArray((raw as any).data?.actions))
            list = (raw as any).data.actions;
          else if (Array.isArray((raw as any).data?.items))
            list = (raw as any).data.items;
          else list = [];
        } else {
          list = [];
        }

        if (!cancelado) setAcoes(Array.isArray(list) ? list : []);
      } catch (e: any) {
        if (!cancelado) {
          if (e.name === "AbortError") return;
          setErro(e?.message ?? "Falha ao carregar ações.");
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();

    return () => {
      cancelado = true;
      controller.abort();
    };
  }, [debouncedText, odsIds]);

  const filtered = useMemo(() => {
    const q = safeLower(debouncedText);
    const odsWanted = odsFilters.map(safeLower);

    return acoes.filter((a) => {
      const title = safeLower(a.title ?? a.title ?? "");
      const shortDesc = safeLower(a.short_description);
      const longDesc = safeLower(a.description);
      const ongName = safeLower(a.ong?.name);

      const odsNames = (a.sustainable_development_goals ?? [])
        .map((g) => safeLower(g?.name))
        .filter(Boolean);

      const searchMatch =
        !q ||
        title.includes(q) ||
        shortDesc.includes(q) ||
        longDesc.includes(q) ||
        ongName.includes(q) ||
        odsNames.some((n) => n.includes(q));

      const odsMatch =
        odsWanted.length === 0 || odsWanted.some((n) => odsNames.includes(n));

      return searchMatch && odsMatch;
    });
  }, [acoes, debouncedText, odsFilters]);

  const cards: Omit<Cardacaoprops, "onEntrarContato">[] = useMemo(() => {
    return filtered
      .map((a) => {
        const nomeacao = (a.title ?? "").trim();
        const descricao = (a.short_description || a.description || "").trim();

        const odsNomes =
          a.sustainable_development_goals
            ?.map((o) => o?.name)
            .filter(Boolean)
            .slice(0, 4) ?? [];

        const nomedaong = a.ong?.name ?? "";
        const emailong = a.ong?.contact_email ?? "";
        const numeroong = a.whatsapp_contact || a.ong?.contact_phone || "";

        if (!nomeacao && !descricao && !nomedaong) return null;

        return {
          acaoId: a.id ?? a.acaoId ?? undefined,
          nomeacao,
          descricao,
          ods1: odsNomes[0] ?? "",
          ods2: odsNomes[1] ?? "",
          ods3: odsNomes[2] ?? "",
          ods4: odsNomes[3] ?? "",
          odsNomes,
          nomedaong,
          emailong,
          numeroong,
        } as Omit<Cardacaoprops, "onEntrarContato">;
      })
      .filter(Boolean) as Omit<Cardacaoprops, "onEntrarContato">[];
  }, [filtered]);

  const handleAbrirModal = (acao: Omit<Cardacaoprops, "onEntrarContato">) => {
    setAcaoSelecionada(acao);
    setModalAberto(true);
  };
  const handleFecharModal = () => {
    setModalAberto(false);
    setAcaoSelecionada(null);
  };

  return (
    <section className="w-[825px] max-w-6xl mx-auto px-1 py-8">
      {loading && (
        <div className="text-sm text-gray-500 mb-3">Carregando ações…</div>
      )}
      {erro && <div className="text-sm text-red-600 mb-3">{erro}</div>}

      {!loading && !erro && (
        <>
          <div className="text-sm text-gray-500 mb-3">
            {cards.length} resultado{cards.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((acao) => (
              <Cardacao
                key={acao.acaoId ?? acao.nomeacao}
                {...acao}
                onEntrarContato={() => handleAbrirModal(acao)}
              />
            ))}
          </div>
        </>
      )}

      {modalAberto && acaoSelecionada && (
        <Modalcontatos
          nomeacao={acaoSelecionada.nomeacao}
          descricao={acaoSelecionada.descricao}
          nomedaong={acaoSelecionada.nomedaong}
          emailong={acaoSelecionada.emailong}
          numeroong={acaoSelecionada.numeroong}
          acaoId={acaoSelecionada.acaoId}
          odsNomes={acaoSelecionada.odsNomes}
          onEntrarContato={handleFecharModal}
        />
      )}
    </section>
  );
}
