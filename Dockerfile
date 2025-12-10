FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./

RUN npm ci

COPY prisma ./prisma
COPY .env ./

RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY .env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc

RUN npm ci --omit=dev
RUN npx prisma generate

RUN npm cache clean --force && rm -rf /tmp/* /var/cache/apk/*
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]