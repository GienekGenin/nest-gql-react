FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

CMD ["node", "dist/main"]