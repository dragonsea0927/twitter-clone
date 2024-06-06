FROM node:18.18.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build
 
FROM node:18.18.0

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8000

CMD ["npm", "run", "dev"]
