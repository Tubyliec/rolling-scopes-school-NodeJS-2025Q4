FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/doc ./doc

RUN npm ci --omit=dev
RUN npm prune --production
RUN npx prisma generate
RUN npm cache clean --force && rm -rf /tmp/* /var/cache/apk/*
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]