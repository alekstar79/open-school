FROM node:16.15.0-alpine as build-stage
WORKDIR /os-app-client
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_API_BASE_URL
ENV VUE_APP_API_BASE_URL=$VUE_APP_API_BASE_URL
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /os-app-client/dist /usr/share/nginx/html
EXPOSE $VUE_DOCKER_PORT
CMD ["nginx", "-g", "daemon off;"]
