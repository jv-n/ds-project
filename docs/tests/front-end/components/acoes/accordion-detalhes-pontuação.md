## Teste do Componente de Accordion de Detalhamento de Pontuação

### Descrição

**Sistema**  
Selo de Responsa.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Accordion de Pontuação.

**Responsável**  
Gabriel Ayres **<@gcfa>**

**Data**  
18/08/2025

**Breve descrição**  
Valida a listagem de critérios (label, detalhe, pontos), o total somado e o comportamento de abrir/fechar o accordion.

**Arquivos**

- `client/__tests__/componentes/accordion-detalhes-pontuacao.test.tsx`

**Pré-condições**

- Vitest + RTL.

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Clicar no cabeçalho do accordion. | Lista de critérios é exibida (labels/detalhes/pontos). | Não |
| 1 | Verificar total. | Pontuação Total Visível. | Não |
| 2 | Clicar novamente no cabeçalho. | Conteúdo fecha; total e detalhes somem. | Não |
