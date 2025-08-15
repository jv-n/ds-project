# Adoção do Modelo Cliente-Servidor de Arquitetura de Software

## Contexto

Para iniciar o projeto da disciplina, era necessário definir o modelo para a arquitetura de software que seria utilizada pelo time de desenvolvimento, a fim de termos base para prosseguir para os próximos passos e direcionar os nossos esforços para frentes como escalabilidade e manutenção do projeto no longo prazo.

Dessa forma, exploramos três possibilidades principais, apresentadas no decorrer da disciplina:

1. Arquitetura Monolítica
2. Arquitetura Cliente-Servidor
3. Arquitetura Baseada em Microsserviços

Comparação (alto nível e benefícios):

- Monolítica — Benefícios: simplicidade de implementação e implantação (um único artefato), menor sobrecarga operacional e curva de aprendizado reduzida para times pequenos. Adequada quando o escopo é restrito e a evolução é pouco incerta. Limitações: acoplamento elevado, escalabilidade menos granular e menor flexibilidade tecnológica.

- Microsserviços — Benefícios: escalabilidade independente por domínio, autonomia de equipes, possibilidade de tecnologias heterogêneas, resiliência a falhas isoladas. Limitações: alta complexidade operacional (orquestração, observabilidade, comunicação, versionamento), aumento de latência entre serviços e necessidade de maturidade DevOps e de infraestrutura.

- Cliente-Servidor — Benefícios: separação clara de responsabilidades entre cliente (UI/experiência) e servidor (regras de negócio e dados), permitindo desenvolvimento paralelo, ciclos de deploy independentes por camada, escalabilidade simplificada do backend (horizontal/vertical), uso de CDN para ativos do cliente e uma complexidade operacional moderada (significativamente menor que microsserviços). Mantém o contrato de API como fronteira explícita, favorecendo testes e modularidade sem os custos integrais de um ecossistema distribuído de microsserviços.

À luz do escopo acadêmico, do tamanho do time e do horizonte de entrega, a arquitetura cliente-servidor oferece o melhor equilíbrio entre simplicidade operacional e evolutividade, preservando a possibilidade de, no futuro, extrair domínios específicos do servidor para serviços independentes quando (e se) houver justificativa.

## Decisão:

Decidimos adotar o modelo cliente-servidor para a arquitetura de software.

## Status:

Aceita em 20/07/2025.

## Consequências:

A separação entre cliente e servidor viabiliza desenvolvimento paralelo (front-end e back-end), deploys independentes por camada, e escalabilidade dirigida: ativos estáticos do cliente podem ser servidos via CDN, enquanto o servidor é dimensionado conforme a carga de API e banco de dados. O contrato de API funciona como fronteira estável, facilitando testes de integração, documentação (OpenAPI), versionamento e o consumo por outros clientes (web, mobile). Do ponto de vista de segurança, concentramos a superfície sensível no servidor, onde aplicamos autenticação/autorização, CORS e rate limiting. Em termos de qualidade, a arquitetura favorece testabilidade (unitários e de integração no servidor; E2E no cliente) e observabilidade objetiva (APM no back; telemetria no front).

Por outro lado, o servidor permanece um núcleo único (ainda que modular), o que pode criar gargalos em domínios muito exigentes; a evolução para microsserviços exigirá refatoração de limites de domínio e investimento em infraestrutura (mensageria, service discovery, tracing distribuído). Existe também dependência disciplinada do contrato de API: mudanças devem seguir versionamento e depreciação planejada para evitar rupturas no cliente. Além disso, a comunicação cliente↔servidor introduz latência de rede e demanda boas práticas de paginação, cache e idempotência. Mesmo assim, para o contexto atual do projeto, os benefícios de clareza, paralelismo e governança superam esses custos e mantêm aberta a trilha de evolução futura.
