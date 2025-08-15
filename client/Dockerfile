# Etapa 1: Construção do projeto
FROM node:18 AS build
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Construção do Next.js
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:18 AS runtime
WORKDIR /app

# Copia os arquivos necessários da etapa de build
COPY --from=build /app ./

# Expõe a porta 3008
EXPOSE 3008

# Define a variável de ambiente para mudar a porta do Next.js
ENV PORT=3008

# Inicia o servidor Next.js
CMD ["npm", "start"]
