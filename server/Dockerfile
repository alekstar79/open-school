FROM node:16.15.0-alpine

WORKDIR /os-app-server
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.mjs"]
