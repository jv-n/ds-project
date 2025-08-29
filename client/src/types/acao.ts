// client/src/types/acao.ts
export type Acao = {
  id: number;
  nome: string;
  descricao: string;
  nomeOng: string;
  emailOng: string;
  telefoneOng: string;
  odsAcao: number[];
};

export const ODS_NAME_TO_ID: Record<string, number> = {
  "Erradicação da Pobreza": 1,
  "Fome Zero e Agricultura Sustentável": 2,
  "Saúde e Bem-estar": 3,
  "Educação de Qualidade": 4,
  "Igualdade de gênero": 5,
  "Água potável e saneamento": 6,
  "Energia limpa e acessível": 7,
  "Trabalho decente e crescimento econômico": 8,
  "Indústria, inovação e infraestrutura": 9,
  "Redução das Desigualdades": 10,
  "Cidades e comunidades sustentáveis": 11,
  "Consumo e produção responsáveis": 12,
  "Ação contra a mudança global do clima": 13,
  "Vida na água": 14,
  "Vida terrestre": 15,
  "Paz, justiça e instituições eficazes": 16,
  "Parcerias e meios de implementação": 17,
};
