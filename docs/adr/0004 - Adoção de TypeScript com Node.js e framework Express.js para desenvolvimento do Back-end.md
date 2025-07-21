# Adoção de TypeScript com Node.js e framework Express.js para desenvolvimento do Back-end

## Contexto:

A seleção da linguagem de programação e do framework para o desenvolvimento do back-end é uma decisão fundamental que impacta diretamente a velocidade de desenvolvimento, a manutenção do código, a performance do sistema e a capacidade de integração com outras tecnologias, incluindo nosso banco de dados relacional PostgreSQL (conforme ADR 3).

Nosso projeto, em parceria com o programa "Bora Impactar", é uma plataforma web com um foco robusto em matchmaking entre ONGs e empresas, gerenciamento de doações, um sistema de gamificação e, de forma crítica, um fluxo de auditoria conduzido pela Prefeitura do Recife. Esta arquitetura monolítica (conforme ADR 2) exige que o back-end seja capaz de gerenciar múltiplas APIs, lidar com operações de I/O intensivas (como upload de documentos para auditoria e registro de transações) e garantir a integridade dos dados relacionados a selos e engajamento.

Considerando que o nosso time de desenvolvimento busca otimizar a produtividade e a curva de aprendizado em um projeto com o prazo da disciplina, decidimos por um stack que maximize a coerência e a segurança de tipos.

## Decisão:

Decidimos adotar TypeScript com Node.js e o framework Express.js para o desenvolvimento do back-end do projeto.

## Status:

Aceita em 20/07/2025.

## Consequências:

A escolha de TypeScript com Node.js e Express.js trará os seguintes benefícios e implicações para o projeto da disciplina:

1. Unificação Tecnológica e Produtividade da Equipe: A utilização de TypeScript em todo o stack (front-end e back-end) simplificará drasticamente o desenvolvimento e a manutenção. Isso eliminará a sobrecarga de mudança de contexto entre linguagens/paradigmas, permitindo que a equipe se concentre em um único ecossistema e ferramentas, otimizando a produtividade em um projeto com o curto prazo da disciplina.
2. Robustez e Manutenibilidade Aumentadas com Tipagem Estática: A tipagem estática fornecida pelo TypeScript em todo o código-base, desde as APIs do back-end até a lógica de negócios, aumentará significativamente a robustez e a manutenibilidade do código. Isso é crucial para um projeto com fluxos de dados complexos (matchmaking, gamificação, auditoria), ajudando a prevenir erros em tempo de desenvolvimento, melhorando a refatoração e tornando o código mais compreensível e seguro para futuras modificações.
3. Eficiência em Operações de I/O e Auditoria: O modelo de I/O assíncrono e não-bloqueante do Node.js é ideal para lidar com as operações intensivas de gravação e processamento de documentos inerentes ao fluxo de auditoria da Prefeitura do Recife. Ele permitirá que o servidor gerencie eficientemente múltiplas requisições concorrentes (cadastro de doações, upload de documentos, atualizações de selos), garantindo respostas rápidas e uma experiência fluida para empresas e auditores.
4. Ecossistema Amplo e Flexibilidade para APIs: O npm (Node Package Manager) oferece um vasto repositório de bibliotecas e ferramentas, acelerando a implementação das APIs necessárias para o matchmaking, o sistema de gamificação e o gerenciamento de doações. O Express.js, como framework minimalista, confere a flexibilidade necessária para construir essas APIs de forma customizada e performática.
5. Curva de Aprendizado de TypeScript (Desafio Mitigável): Embora o TypeScript possa apresentar uma curva de aprendizado inicial para membros da equipe menos familiarizados com tipagem estática, o investimento nesse aprendizado é compensado pela maior segurança, qualidade do código e pela unificação do conhecimento no time. As ferramentas modernas de IDEs oferecem excelente suporte, mitigando parte dessa complexidade.
