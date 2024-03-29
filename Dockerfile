FROM node:18.11-slim As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


WORKDIR /usr/src/app

COPY . .

RUN npx prisma generate

RUN npm run build



FROM node:18.11-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]