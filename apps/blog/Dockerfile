FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

RUN npm run build:ssr

EXPOSE 8080

CMD ["node", "dist/apps/blog-api/main.js"]