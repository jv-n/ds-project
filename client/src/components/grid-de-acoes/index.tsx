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
  odsFilters: string[];
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

/** Utils */
const safeLower = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const GridAcoes: React.FC<Props> = ({ searchText, odsFilters }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [acaoSelecionada, setAcaoSelecionada] = useState<Omit<
    Cardacaoprops,
    "onEntrarContato"
  > | null>(null);

  const [acoes, setAcoes] = useState<ActionApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // converte nomes de ODS para IDs numéricos (ex.: "Educação de qualidade" -> 4)
  const odsIds = useMemo(
    () =>
      odsFilters
        .map((n) => ODS_NAME_TO_ID[n])
        .filter((v): v is number => typeof v === "number"),
    [odsFilters]
  );

  // debounce no texto
  const [debouncedText, setDebouncedText] = useState(searchText);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedText(searchText), 250);
    return () => clearTimeout(t);
  }, [searchText]);

  // busca remota na API (desembrulhando { actions, pagination } -> actions[])
  useEffect(() => {
    let cancelado = false;

    const fetchAcoes = async () => {
      try {
        setLoading(true);
        setErro(null);

        const base = API ?? "http://localhost:3001";
        const qs = new URLSearchParams();
        if (debouncedText.trim()) qs.set("search", debouncedText.trim());
        if (odsIds.length) qs.set("ods", odsIds.join(","));

        const endpoint = `${base}/actions${
          qs.toString() ? "?" + qs.toString() : ""
        }`;

        const resp = await fetch(endpoint, {
          headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
          throw new Error(
            `Erro ${resp.status}: não foi possível carregar as ações.`
          );
        }

        const payload = await resp.json();
        // O backend retorna: [ { actions: [...], pagination: {...} } ]
        const actions: ActionApi[] = Array.isArray(payload)
          ? payload[0]?.actions ?? []
          : payload?.actions ?? [];

        if (!cancelado) setAcoes(Array.isArray(actions) ? actions : []);
      } catch (e: any) {
        if (!cancelado) setErro(e?.message ?? "Falha ao carregar ações.");
      } finally {
        if (!cancelado) setLoading(false);
      }
    };

    fetchAcoes();
    return () => {
      cancelado = true;
    };
  }, [debouncedText, odsIds.join(",")]);

  // mapeia retorno da API para o formato do Card
  const cards: Omit<Cardacaoprops, "onEntrarContato">[] = useMemo(() => {
    return (acoes ?? [])
      .map((a) => {
        const nomeacao = (a.title ?? "").trim();
        const descricao = (a.short_description || a.description || "").trim();

        // pega até 4 ODS pelo nome
        const odsNomes =
          a.sustainable_development_goals
            ?.map((o) => o?.name)
            .filter(Boolean)
            .slice(0, 4) ?? [];

        const nomedaong = a.ong?.name ?? "";
        const emailong = a.ong?.contact_email ?? "";
        const numeroong = a.whatsapp_contact || a.ong?.contact_phone || "";

        // evita renderizar card vazio
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
  }, [acoes]);

  const handleAbrirModal = (acao: Omit<Cardacaoprops, "onEntrarContato">) => {
    setAcaoSelecionada(acao);
    setModalAberto(true);
  };
  const handleFecharModal = () => {
    setModalAberto(false);
    setAcaoSelecionada(null);
  };

  const resultados = cards;

  return (
    <section className="w-[825px] max-w-6xl mx-auto px-1 py-8">
      {loading && (
        <div className="text-sm text-gray-500 mb-3">Carregando ações…</div>
      )}
      {erro && <div className="text-sm text-red-600 mb-3">{erro}</div>}

      {!loading && !erro && (
        <>
          <div className="text-sm text-gray-500 mb-3">
            {resultados.length} resultado{resultados.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultados.map((acao, index) => (
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
};

export default GridAcoes;
