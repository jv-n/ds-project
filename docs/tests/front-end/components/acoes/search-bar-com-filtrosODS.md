## Teste do Componente de Searchbar com Filtros de ODS

### Descrição

**Sistema**  
Selo de Responsa.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Searchbar com Filtros de ODS.

**Responsável**  
Gabriel Ayres **<@gcfa>**

**Data**  
18/08/2025

**Breve descrição**  
Valida emissão de eventos de busca e filtros ODS, fechamento do dropdown ao clicar fora e acúmulo/remoção/limpeza de filtros.

**Arquivos**

- `client/__tests__/componentes/search-bar-com-filtrosODS.test.tsx`

**Pré-condições**

- Vitest + RTL.
- Harness controlando `searchText` e `activeOds`.
- Mocks: `next/image`, `@/assets`, `lucide-react`.

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Digitar texto no input. | `onSearchTextChange` chamado; input mostra o valor. | Não |
| 1 | Abrir dropdown e clicar em “1. Erradicação da Pobreza”. | `onAddOds("Erradicação da Pobreza")` chamado; pílula aparece. | Não |
| 2 | Clicar fora (no input) com dropdown aberto. | Dropdown fecha (`aria-expanded=false`). | Não |
| 3 | Selecionar múltiplas ODS (abrindo de novo). | Pílulas acumulam; callbacks chamados para cada seleção. | Não |
| 4 | Remover uma pílula. | `onRemoveOds` chamado; pílula some. | Não |
| 5 | Mostrar “Limpar filtros” com busca/ODS ativas e clicar. | `onClearAll` chamado; pílulas e busca limpas. | Não |
