# Documentação dos testes - Modal de Critérios

#### Componentes testados:
- CardMedalhaBronze
- CardMedalhaPrata
- CardMedalhaOuro
- Modalcriterios

## Objetivo dos testes
Verificar o funcionamento do modal de critérios ao ser aberto por cada um dos três cards (nível bronze, prata e ouro) e garantir que o modal fecha corretamente.

## Cenários testados
### 1. Abertura do modal ao clicar em "Ver Critérios" do card de nível Bronze:
- Ação: Clicar em "Ver Critérios" no “CardMedalhaBronze”.
- Resultado esperado: Modal de critérios com nivel="bronzemedal" deve ser
exibido.
- Resultado obtido: OK.

### 2. Abertura do modal ao clicar em "Ver Critérios" do card de nível Prata
- Ação: Clicar em "Ver Critérios" no “CardMedalhaPrata”.
- Resultado esperado: Modal de critérios com nivel="silvermedal" deve ser
exibido.
- Resultado obtido: OK.

### 3. Abertura do modal ao clicar em "Ver Critérios" do card de nível Ouro
- Ação: Clicar em "Ver Critérios" no “CardMedalhaOuro”.
- Resultado esperado: Modal de critérios com nivel="goldenmedal" deve ser
exibido.
- Resultado obtido: OK.

### 4. Fechamento do modal
- Ação: Clicar no botão de "X" no canto superior direito do modal.
- Resultado esperado: O modal deve ser fechado (estado mostrarcriterios
definido como ”off”).
- Resultado obtido: OK.

## Resultados
- Todos os testes foram executados com sucesso.
- O modal abre corretamente com os critérios de cada nível ao clicar no botão correspondente em cada card, e fecha normalmente conforme esperado.
