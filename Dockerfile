#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:ssr

#stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/qratings_frontend /usr/share/nginx/html
# EXPOSE 80
CMD ["npm", "run", "serve:ssr"]