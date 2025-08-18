## Teste do Componente de Modal de Revisão de Documentos

### Descrição

**Sistema**  
Selo de Responsa.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Modal de Revisão.

**Responsável**  
Gabriel Ayres **<@gcfa>**

**Data**  
18/08/2025

**Breve descrição**  
Valida exibição de documentos e metadados por empresa, fluxo de aprovação/reprovação e atributos de download.

**Arquivos**

- `client/__tests__/componentes/modal-revisao.test.tsx`

**Pré-condições**

- Vitest + RTL.
- Harness controlando `isOpen` e fechando no `onClose`.
- Mocks: `Button`, `Chip`, `lucide-react`.

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar com `status="aguardando"` e 2 documentos. | Título visível; “Documentos Anexados (2)” e cada doc com nome/tipo/data. | Não |
| 1 | Verificar links de download. | `<a>` com `href`, `download`, `target="_blank"`, `rel="noopener"`. | Não |
| 2 | Conferir segmentação por empresa (detalhes). | Empresa, Email e ONG exibidos conforme props. | Não |
| 3 | Clicar em Aprovar e notificar. | `onClose` chamado; modal some (`isOpen=false` no Harness). | Não |
| 4 | Clicar em Reprovar → digitar motivo → Reprovar e notificar. | Campo “Motivo da Reprovação” visível; `onClose` chamado e modal fecha. | Não |
| 5 | Renderizar com `status="reprovada"` e `motivoReprovacao`. | Banner de reprovação mostra o motivo + documentos listados. | Não |
