## Teste do Componente de Card de Ação

### Descrição

**Sistema**  
Selo de Responsa.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Card de Ação.

**Responsável**  
Gabriel Ayres **<@gcfa>**

**Data**  
18/08/2025

**Breve descrição**  
Valida a renderização de título, descrição e chips de ODS (ignorando vazios), além do CTA “Entrar em contato” disparar o callback.

**Arquivos**

- `client/__tests__/componentes/card-de-acao.tsx`

**Pré-condições**

- Ambiente de testes com Vitest + React Testing Library (jsdom).
- `onEntrarContato` provido como mock.
- Mocks para `next/image` e `@/assets` quando necessário.

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar `Cardacao` com `ods1..4` preenchidos (alguns vazios/whitespace). | Apenas ODS não vazias aparecem como chips. | Não |
| 1 | Renderizar com `descricao` e `nomedaong`. | A descrição (da ação) e o nome da ONG são exibidos. | Não |
| 2 | Clicar em “Entrar em contato”. | `onEntrarContato` chamado 1x. | Não |
| 3 | Renderizar com `ods1..4` vazios. | Nenhum chip de ODS aparece. | Não |
| 4 | Renderizar com `nomeacao`. | Título do card visível. | Não |
