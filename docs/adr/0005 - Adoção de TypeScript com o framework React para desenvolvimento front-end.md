# Adoção de TypeScript com o framework React para desenvolvimento front-end

## Contexto:

A camada de front-end é a interface principal da nossa plataforma e, portanto, é fundamental para garantir uma experiência de usuário intuitiva, responsiva e engajadora. Ela será responsável por permitir que as empresas visualizem e filtrem ações, conectem-se com ONGs, cadastrem doações, acompanhem seus selos de gamificação e utilizem o fluxo de auditoria da Prefeitura do Recife, por exemplo.

A seleção da linguagem e do framework de front-end, então, impacta diretamente a velocidade de desenvolvimento da interface, a reatividade do sistema, a manutenibilidade do código e a capacidade de consumir eficientemente as APIs do back-end.

Dado que o back-end será desenvolvido utilizando TypeScript com Node.js e Express.js (conforme ADR 4), a adoção de TypeScript para o front-end garante uma unificação tecnológica e um modelo de tipos consistente em todo o stack completo. Isso otimizará drasticamente o aprendizado, o compartilhamento de conhecimento e a refatoração, o que é um benefício significativo para um projeto com prazo e recursos limitados como o nosso.

Para esta decisão, avaliamos os frameworks JavaScript mais proeminentes no mercado. Com base na necessidade de robustez, manutenibilidade e escalabilidade do código, especialmente para um sistema com fluxos de dados complexos como o nosso, focamos na combinação de React com TypeScript. Além disso, essa combinação nos permite ter a capacitação necessária para as habilidades que são bastante requeridas por diversas empresas do mercado, o que fortalece o elo universidade <> mercado.

## Decisão:

Decidimos adotar TypeScript com o framework React para desenvolver o front-end da plataforma.

## Status:

Aceita em 20/07/2025.

## Consequências:

A escolha de TypeScript com React trará os seguintes benefícios e implicações para o nosso projeto:

1. Unificação Tecnológica e Máxima Produtividade da Equipe: A utilização de TypeScript em todo o stack (front-end e back-end) permitirá que a equipe se mova mais agilmente entre as camadas. Isso resultará em maior produtividade, menor curva de aprendizado geral e uma compreensão mais profunda do fluxo de dados e tipos em todo o sistema, crucial para cumprir os prazos curtos do projeto da disciplina.
2. Consistência e Segurança de Tipos no Front-end: A tipagem estática do TypeScript, aplicada à interface do usuário, garantirá a consistência dos dados manipulados no front-end com os dados recebidos do back-end. Isso reduzirá a ocorrência de erros em tempo de execução, facilitará a depuração e tornará o código mais seguro e previsível para funcionalidades como filtros, exibição de doações e o painel de selos (gamificação da plataforma).
3. Interface Reativa e Modular com React: A abordagem baseada em componentes do React facilitará a construção de uma interface de usuário modular e reutilizável. Isso é ideal para os diversos elementos da plataforma (como os cartões de ações, filtros de ODS/localização, o formulário de doações e o painel de selos), garantindo uma experiência de usuário fluida e reativa para as empresas e um desenvolvimento eficiente para a equipe.
4. Ecossistema Amplo e Ferramentas Modernas: A combinação de React e TypeScript possui um dos ecossistemas mais fortes no desenvolvimento web, o que nos garante acesso a uma vasta gama de bibliotecas, ferramentas de desenvolvimento e uma comunidade ativa, acelerando o desenvolvimento e facilitando a resolução de problemas, especialmente ao integrar com as APIs tipadas do back-end.
5. Curva de Aprendizado Inicial de TypeScript (Desafio Mitigável): Embora o TypeScript possa apresentar uma curva de aprendizado inicial para membros da equipe menos familiarizados com tipagem estática, o investimento nesse aprendizado é compensado pela maior segurança, qualidade do código e pela consistência em todo o projeto.
