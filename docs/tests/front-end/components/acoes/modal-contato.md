## Teste do Componente de Modal de Contato

### Descrição

**Sistema**  
Selo de Responsa.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Modal de Contato.

**Responsável**  
Gabriel Ayres **<@gcfa>**

**Data**  
18/08/2025

**Breve descrição**  
Valida a exibição do email e WhatsApp, fechamento por ações de UI, e comportamento/estado dos botões (habilitado/desabilitado), incluindo formatação de links.

**Arquivos**

- `client/__tests__/componentes/modal-contato.test.tsx`

**Pré-condições**

- Ambiente de testes com Vitest + React Testing Library (jsdom).
- `onEntrarContato` mockado.
- Mocks para `next/image` e `@/assets` quando necessário.
- `window.open` espiado (spy) para inspeção.

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar com `emailong` e `numeroong` válidos. | Email e número aparecem; `role="dialog"` presente. | Não |
| 1 | Clicar em Cancelar. | `onEntrarContato` chamado 1x (fecha). | Não |
| 2 | Verificar classes de clique (cursor) em Cancelar, Email e WhatsApp. | Elementos possuem `cursor-pointer` quando habilitados. | Não |
| 3 | Renderizar com `emailong=""` e clicar bloco de e-mail. | Bloco desabilitado (`pointer-events-none`/`opacity-60`); não abre janela. | Não |
| 4 | Renderizar com `numeroong=""`. | Link do WhatsApp desabilitado, `href="#"`. | Não |
| 5 | Clicar no backdrop. | `onEntrarContato` chamado 1x (fecha). | Não |
| 6 | Pressionar Esc. | `onEntrarContato` chamado 1x (fecha). | Não |
| 7 | Conferir `href` do WhatsApp com número BR. | `wa.me/55<apenas dígitos>` e `text=` codificado. | Não |
| 8 | Clicar no bloco Enviar e-mail. | `window.open` chamado com URL do Gmail, `_blank`, `noopener`. | Não |
