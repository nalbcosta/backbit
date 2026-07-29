FROM node:22-bookworm-slim

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@11.18.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/types/package.json packages/types/package.json

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
