FROM node:lts-alpine

WORKDIR /olympus-banking

COPY package*.json ./
COPY apps/plutus/package*.json ./apps/plutus/
COPY shared/schemas/package*.json ./shared/schemas/
COPY shared/dtos/package*.json ./shared/dtos/

RUN npm install

COPY tsconfig.base.json ./
COPY apps/plutus ./apps/plutus
COPY shared ./shared

WORKDIR /olympus-banking/apps/plutus

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
