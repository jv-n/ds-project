// src/server.ts - AJUSTE NECESSÁRIO

import { createApp } from './app'; // Importa a função em vez da instância

const app = createApp(); // Chama a função para criar o app
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});