## Teste do Componente de Formulário de Doação

### Descrição

**Sistema**  
Selo de Responsa.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Formulário de Doação.

**Responsável**  
Gabriel Ayres **<@gcfa>**

**Data**  
18/08/2025

**Breve descrição**  
Valida o fluxo do formulário de doação: exibição de informações da ONG/ação, seleção de um único tipo de doação, preenchimento de valor/quantidade, anexo de documentos, fechamento via botão “X” e envio correto dos dados.

**Arquivos**

- `client/__tests__/componentes/formulario-doacao.test.tsx`

**Pré-condições**

- Ambiente de testes com Vitest + React Testing Library (jsdom).
- `onClose` e `onSubmitDonation` fornecidos como mocks.
- Componentes filhos podem ser moqueados para simplificar interação:
  - `FloatingInput` (como `<select>` quando recebe `options`, e `<input>` quando não).
  - `FileUploadInput` (como `<input type="file" multiple>` que chama `onFilesAttached` no `change`).
- Props mínimas para renderização:
  - `ongName="ONG Esperança"`
  - `actionName="Campanha de Inverno"`

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar `CadastroDoacao` com `ongName` e `actionName`. | Cabeçalho exibe “ONG Esperança” e “Ação: Campanha de Inverno”. | Não |
| 1 | Clicar no botão “X” no cabeçalho. | `onClose` é chamado 1x (componente deve ser fechado pelo pai). | Não |
| 2 | Selecionar no campo “Tipo de doação*” a opção “Dinheiro”. | Valor do campo torna-se “Dinheiro” (seleção única; trocar opção substitui a anterior). | Não |
| 3 | Preencher o campo “Valor ou quantidade*” com “R$ 1000”. | Campo reflete o texto digitado: “R$ 1000”. | Não |
| 4 | Anexar os arquivos “comprovante.pdf” e “recibo.jpg” no campo “Documentos Comprobatórios*”. | Componente registra 2 arquivos anexados (lista interna atualizada). | Não |
| 5 | Clicar no botão “Enviar para validação”. | `onSubmitDonation` é chamado 1x com payload: `{ tipoAjuda: "Dinheiro", valorOuQuantidade: "R$ 1000", documentos: [File("comprovante.pdf"), File("recibo.jpg")] }`. | Não |
| 6 | (Validação) Clicar em “Enviar para validação” sem preencher tipo, valor e documentos. | Exibe mensagens de erro: “Selecione o tipo de doação.”, “Informe o valor ou quantidade.” e “Anexe pelo menos um documento.”; `onSubmitDonation` não é chamado. | Não |
