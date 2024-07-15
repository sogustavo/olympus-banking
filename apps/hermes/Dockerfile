FROM node:lts-alpine

WORKDIR /olympus-banking

COPY package*.json ./
COPY apps/hermes/package*.json ./apps/hermes/
COPY shared/schemas/package*.json ./shared/schemas/
COPY shared/dtos/package*.json ./shared/dtos/

RUN npm install

COPY tsconfig.base.json ./
COPY apps/hermes ./apps/hermes
COPY shared ./shared

WORKDIR /olympus-banking/apps/hermes

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
