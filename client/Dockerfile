# ---------- 1) Dependências ----------
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- 2) Build ----------
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable


RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Se seu build falha por ESLint, você pode (temporariamente) desativar no script:
# - Mude em package.json: "build": "next build --no-lint"
# ou use diretamente aqui:
RUN pnpm exec next build --no-lint

# ---------- 3) Runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8005
ENV NEXT_PUBLIC_API_BASE=/api
RUN apk add --no-cache libc6-compat

# Next standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8005
CMD ["node", "server.js"]
