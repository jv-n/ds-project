# Adoção do PostgreSQL como SGBD relacional principal do projeto

## Contexto:

A camada de persistência é um componente crítico da arquitetura do nosso sistema, responsável pelo armazenamento, recuperação e gestão dos dados. A seleção do SGBD adequado impacta diretamente a performance, a escalabilidade, a integridade dos dados e a complexidade do desenvolvimento.

Nosso projeto envolve, entre outros, um fluxo de auditoria de documentos, caracterizado por múltiplas e frequentes operações de gravação de dados, além da necessidade de rastreabilidade e garantia de integridade transacional. Para atender a esses requisitos, o modelo de banco de dados relacional se apresenta como a opção mais aderente devido à sua capacidade de modelar dados estruturados, gerenciar relacionamentos complexos e assegurar a conformidade ACID (Atomicidade, Consistência, Isolamento, Durabilidade).

Dentro do escopo dos bancos de dados relacionais, avaliamos principalmente duas opções robustas e amplamente utilizadas no mercado:
1. PostgreSQL: Reconhecido por sua conformidade rigorosa com o padrão SQL, robustez, recursos avançados (como MVCC para concorrência eficiente) e forte garantia de integridade de dados.
2. MySQL: Amplamente popular, conhecido por sua performance e facilidade de uso para diversas aplicações web, com suporte a transações ACID através do motor InnoDB.

## Decisão:

Decidimos adotar o PostgreSQL como o Sistema de Gerenciamento de Banco de Dados (SGBD) relacional principal para o projeto.

## Status:

Aceita em 20/07/2025.

## Consequências:

A escolha do PostgreSQL traz os seguintes benefícios e implicações para o projeto, alinhando-se diretamente às necessidades da plataforma e ao contexto da nossa equipe:

1. Garantia de Integridade e Confiabilidade dos Dados: A robustez do PostgreSQL e sua estrita conformidade ACID são cruciais para o fluxo de auditoria, assegurando que cada registro de aprovação/recusa seja armazenado de forma consistente e segura, mesmo sob alta concorrência de escrita.
2. Eficiência em Operações Concorrentes: O MVCC (Multi-Version Concurrency Control) do PostgreSQL permite que as operações de leitura e escrita ocorram simultaneamente com mínima interferência, o que é vital para um sistema com frequentes gravações, garantindo que os usuários possam consultar o status dos documentos sem bloqueios.
3. Curva de Aprendizado e Desafios (Trade-off): Embora o PostgreSQL seja altamente capaz, sua configuração e otimização para performance máxima podem apresentar uma curva de aprendizado inicial ligeiramente maior em comparação com alternativas mais simples. No entanto, acreditamos que o investimento neste aprendizado é justificado pelos benefícios de longo prazo em robustez e funcionalidade.
