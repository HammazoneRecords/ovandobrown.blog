FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm@10
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/drizzle ./drizzle
RUN pnpm install --no-frozen-lockfile --prod
RUN mkdir -p ./public/uploads
EXPOSE 3006
CMD ["pnpm", "start"]
