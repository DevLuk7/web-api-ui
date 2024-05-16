FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:blog-api

EXPOSE 8080

CMD ["node", "dist/apps/blog-api/main.js"]