FROM node AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
CMD ["node","dist/src/main.js"]