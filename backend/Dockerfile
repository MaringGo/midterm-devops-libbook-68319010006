FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

USER node

CMD ["node", "index.js"]
