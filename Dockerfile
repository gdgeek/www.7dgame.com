FROM node:16.14.0 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:stage

FROM nginx:latest AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]