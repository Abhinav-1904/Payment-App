# Base stage for dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./

# Dependencies stage
FROM base AS deps
RUN npm install

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/apps/user-app/.next/standalone ./
COPY --from=builder /app/apps/user-app/.next/static ./apps/user-app/.next/static
COPY --from=builder /app/apps/user-app/public ./apps/user-app/public

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "apps/user-app/server.js"] 