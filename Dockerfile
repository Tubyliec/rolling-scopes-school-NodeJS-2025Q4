FROM node AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/.env ./.env
RUN npm ci --only=production
RUN npx prisma generate
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]