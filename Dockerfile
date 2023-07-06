FROM node:18

WORKDIR /usr/src/app

# Dependencies

COPY package.json ./
COPY package-lock.json ./
COPY lerna.json ./

COPY packages/api/package.json ./packages/api/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Build

RUN npm ci

COPY ./ ./

EXPOSE 4000

RUN npm run build

CMD [ "npm", "run", "start" ]