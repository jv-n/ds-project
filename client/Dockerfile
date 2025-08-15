
FROM node:18 AS build
WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build


FROM node:18 AS runtime
WORKDIR /app
COPY --from=build /app ./

EXPOSE 3008

ENV PORT=3008

CMD ["npm", "start"]
