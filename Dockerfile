FROM node:18

WORKDIR /usr/src/app

# Dependencies

COPY package.json ./
COPY package-lock.json ./
COPY lerna.json ./

COPY packages/api/package.json ./packages/api/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/ui/package.json ./packages/ui/package.json

RUN npm ci

COPY ./ ./

EXPOSE 4000
EXPOSE 3000 

RUN npm run build

RUN npm run dev:run-api