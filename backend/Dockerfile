FROM node:20-alpine

LABEL org.opencontainers.image.title="PSW Backend"
LABEL org.opencontainers.image.description="Express API con MongoDB"
LABEL org.opencontainers.image.version="1.0.0"

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

CMD ["node", "src/app.js"]