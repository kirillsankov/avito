FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --legacy-peer-deps || npm install --only=production

COPY . .

EXPOSE 3001

# Запускаем сервер
CMD ["node", "server.js"]

