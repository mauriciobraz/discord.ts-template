# Stage 1: Install dependencies
FROM node:16.9.0-alpine as dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: Build the app
FROM node:16.9.0-alpine AS builder

WORKDIR /app
COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Run the app
FROM node:16.9.0-alpine AS runner

WORKDIR /usr/app

COPY --from=builder /app/build ./build
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

USER node
CMD ["npm", "start"]
