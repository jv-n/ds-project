"use client";

import React, { useMemo, useState } from "react";
import Cardacao, { Cardacaoprops } from "@/components/card-de-acao";
import Modalcontatos from "@/components/modal-contato";

/** ---- Dados (iguais aos que você enviou) ---- */
const arrayAcoes: Omit<Cardacaoprops, "onEntrarContato">[] = [
  {
    nomeacao: "Sustentando Vidas",
    descricao:
      "Garantir o funcionamento mensal das açõe sociais da Obras Sociais Padre Romeu.",
    ods1: "Saúde e Bem-estar",
    ods2: "Educação de Qualidade",
    ods3: "Redução das Desigualdades",
    ods4: "Erradicação da Pobreza",
    nomedaong: "Obras Sociais Padre Romeu",
    emailong: "padreromeu@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Casa Terapêutica para os Autistas",
    descricao:
      "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
    ods1: "Fome Zero e Agricultura Sustentável",
    ods2: "Erradicação da Pobreza",
    ods3: "Saúde e Bem-estar",
    ods4: "Educação de Qualidade",
    nomedaong: "Juntas somos mais fortes famílias de crianças autistas",
    emailong: "ctpa@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Ação Abril Laranja – Proteção Animal​",
    descricao:
      "Realizar rondas em mercados públicos e colônias de animais no Recife, oferecendo desparasitação e...",
    ods1: "Saúde e Bem-estar",
    ods2: "Cidades e comunidades sustentáveis",
    ods3: "Vida terrestre",
    ods4: "Consumo e produção responsáveis",
    nomedaong: "Ronda Pet",
    emailong: "rondapet@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Ação Dance com o Leão",
    descricao:
      "Ação de incentivo à prática de dança esportiva entre crianças e jovens.",
    ods1: "Saúde e Bem-estar",
    ods2: "Educação de Qualidade",
    ods3: "Redução das Desigualdades",
    ods4: "Cidades e comunidades sustentáveis",
    nomedaong: "Centro de Treinamento Profissionalizante Leão de Judá",
    emailong: "ctplj@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Ação de inverno",
    descricao:
      "Ação itinerante em pontos da Cidade do Recife para atendimento as pessoas em situação de rua e seus...",
    ods1: "Fome Zero e Agricultura Sustentável",
    ods2: "Erradicação da Pobreza",
    ods3: "Saúde e Bem-estar",
    ods4: "Redução das Desigualdades",
    nomedaong: "Moradores de Rua e seus Cães (MRSC)",
    emailong: "mrsc@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Ação de Páscoa para 300 Crianças​",
    descricao:
      "Manutenção do espaço físico que oferece acolhimento e terapias especializadas para crianças com autismo.",
    ods1: "Saúde e Bem-estar",
    ods2: "Redução das Desigualdades",
    ods3: "Cidades e comunidades sustentáveis",
    ods4: "Educação de Qualidade",
    nomedaong: "Grupo Comunitário Paz e Amor",
    emailong: "gcpa@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Ação Solidária de São João",
    descricao:
      "Distribuiremos comidas tipicas para 250 pessoas e faremos doação de milho para as 250 pessoas no dia...",
    ods1: "Fome Zero e Agricultura Sustentável",
    ods2: "Redução das Desigualdades",
    ods3: "Saúde e Bem-estar",
    ods4: "Cidades e comunidades sustentáveis",
    nomedaong: "Projeto Social Amigos da Comunidade - Sopão Solidário",
    emailong: "psacss@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Adoção Caninos e Felinos",
    descricao:
      "Feira de adoção responsável de cães e gatos em parceria com PETZ.",
    ods1: "Vida terrestre",
    ods2: "Erradicação da Pobreza",
    ods3: "Saúde e Bem-estar",
    ods4: "Cidades e comunidades sustentáveis",
    nomedaong: "Anjos do Poço",
    emailong: "ctpa@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Ações do NBAC",
    descricao:
      "Organização que promove assistência social, educação e cultura para famílias em situação de vulnerabilidade...",
    ods1: "Erradicação da Pobreza",
    ods2: "Fome Zero e Agricultura Sustentável",
    ods3: "Educação de Qualidade",
    ods4: "Redução das Desigualdades",
    nomedaong: "Núcleo de Base Amigos da Comunidade",
    emailong: "nbac@contato.com.br",
    numeroong: "(81)99125003",
  },
  {
    nomeacao: "Café com as mães",
    descricao: "Café da manhã celebrando o dia das mães.",
    ods1: "Fome Zero e Agricultura Sustentável",
    ods2: "Erradicação da Pobreza",
    ods3: "Saúde e Bem-estar",
    ods4: "Igualdade de gênero",
    nomedaong: "Casa da Criança Marcelo Asfora (CCMA)",
    emailong: "ccma@contato.com.br",
    numeroong: "(81)99125003",
  },
];

/** ---- Utils ---- */
const stripPrefix = (s: string) => s.replace(/^\d+\.\s*/, "");
const normalize = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

/** ---- Props ---- */
type Props = {
  searchText: string;
  odsFilters: string[]; // nomes sem numeração
};

const GridAcoes: React.FC<Props> = ({ searchText, odsFilters }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [acaoSelecionada, setAcaoSelecionada] =
    useState<Omit<Cardacaoprops, "onEntrarContato"> | null>(null);

  const handleAbrirModal = (acao: Omit<Cardacaoprops, "onEntrarContato">) => {
    setAcaoSelecionada(acao);
    setModalAberto(true);
  };
  const handleFecharModal = () => {
    setModalAberto(false);
    setAcaoSelecionada(null);
  };

  const resultados = useMemo(() => {
    const tokens = normalize(searchText).split(/\s+/).filter(Boolean);

    return arrayAcoes.filter((acao) => {
      const alvo = normalize(
        [
          acao.nomeacao,
          acao.descricao,
          acao.nomedaong,
          acao.ods1,
          acao.ods2,
          acao.ods3,
          acao.ods4,
        ].join(" ")
      );

      // AND entre termos digitados
      const textoOk = tokens.every((t) => alvo.includes(t));

      // OR entre pílulas de ODS
      const odsDoCard = [acao.ods1, acao.ods2, acao.ods3, acao.ods4]
        .map(stripPrefix)
        .map(normalize)
        .filter(Boolean);

      const odsOk =
        odsFilters.length === 0 ||
        odsFilters.some((f) => odsDoCard.includes(normalize(f)));

      return textoOk && odsOk;
    });
  }, [searchText, odsFilters]);

  return (
    <section className="w-[825px] max-w-6xl mx-auto px-1 py-8">
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