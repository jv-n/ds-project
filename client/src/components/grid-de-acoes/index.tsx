"use client";

import React, { useEffect, useMemo, useState } from "react";
import Cardacao, { Cardacaoprops } from "@/components/card-de-acao";
import Modalcontatos from "@/components/modal-contato";
import { ODS_NAME_TO_ID } from "@/types/acao";

/** ===== Tipos simples do que vem do backend ===== */
type OdsApi = { id: number; name?: string };
type OngApi = {
  name?: string;
  contact_email?: string;
  contact_phone?: string;
};
type ActionApi = {
  id: number;
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

/** Utils */
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

  // Converte nomes de ODS em IDs (se o backend aceitar por query)
  const odsIds = useMemo(
    () =>
      odsFilters
        .map((n) => ODS_NAME_TO_ID[n])
        .filter((v): v is number => typeof v === "number"),
    [odsFilters]
  );

  // Debounce no texto
  const [debouncedText, setDebouncedText] = useState(searchText);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedText(searchText), 250);
    return () => clearTimeout(t);
  }, [searchText]);

  // Busca remota e desembrulha { actions, pagination } -> actions[]
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        setLoading(true);
        setErro(null);

        const qs = new URLSearchParams();
        if (debouncedText.trim()) qs.set("search", debouncedText.trim());
        if (odsIds.length) qs.set("ods", odsIds.join(",")); // se a API ignorar, filtramos no front

        const url = `${BASE || "http://localhost:3001"}/action-company${
          qs.toString() ? `?${qs.toString()}` : ""
        }`;

        const resp = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
          throw new Error(
            `Erro ${resp.status}: não foi possível carregar as ações.`
          );
        }

        const raw = await resp.json();

        let list: ActionApi[] = [];
        if (Array.isArray(raw)) {
          const first = raw[0];
          list = Array.isArray(first?.actions)
            ? first.actions
            : (raw as ActionApi[]);
        } else if (raw && typeof raw === "object") {
          list = Array.isArray(raw.actions) ? raw.actions : [];
        }

        if (!cancelado) setAcoes(Array.isArray(list) ? list : []);
      } catch (e: unknown) {
        if (!cancelado)
          setErro((e as Error)?.message ?? "Falha ao carregar ações.");
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [debouncedText, odsIds]);

  // ===== Filtro LOCAL (funciona mesmo se o backend não filtrar) =====
  const filtered = useMemo(() => {
    const q = safeLower(debouncedText);
    const odsWanted = odsFilters.map(safeLower);

    return acoes.filter((a) => {
      const title = safeLower(a.title);
      const shortDesc = safeLower(a.short_description);
      const longDesc = safeLower(a.description);
      const ongName = safeLower(a.ong?.name);

      // busca: casa em título / descrição curta / descrição / ong / nomes das ODS
      const odsNames = (a.sustainable_development_goals ?? [])
        .map((g) => safeLower(g.name))
        .filter(Boolean);

      const searchMatch =
        !q ||
        title.includes(q) ||
        shortDesc.includes(q) ||
        longDesc.includes(q) ||
        ongName.includes(q) ||
        odsNames.some((n) => n.includes(q));

      // ODS: OR (selecionei 3 ODS, basta ter pelo menos 1)
      const odsMatch =
        odsWanted.length === 0 || odsWanted.some((n) => odsNames.includes(n));

      return searchMatch && odsMatch;
    });
  }, [acoes, debouncedText, odsFilters]);

  // mapeia para o Card
  const cards: Omit<Cardacaoprops, "onEntrarContato">[] = useMemo(() => {
    return filtered
      .map((a) => {
        const nomeacao = (a.title ?? "").trim();
        const descricao = (a.short_description || a.description || "").trim(); // ✅ texto do card

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
          nomeacao,
          descricao,
          ods1: odsNomes[0] ?? "",
          ods2: odsNomes[1] ?? "",
          ods3: odsNomes[2] ?? "",
          ods4: odsNomes[3] ?? "",
          nomedaong,
          emailong,
          numeroong,
        };
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
            {cards.map((acao, index) => (
              <Cardacao
                key={index}
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
          nomedaong={acaoSelecionada.nomedaong}
          emailong={acaoSelecionada.emailong}
          numeroong={acaoSelecionada.numeroong}
          onEntrarContato={handleFecharModal}
        />
      )}
    </section>
  );
}
