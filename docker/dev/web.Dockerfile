FROM node:22-bookworm-slim AS base

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@11.18.0 --activate

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/types/package.json packages/types/package.json

RUN pnpm install --frozen-lockfile

FROM dependencies AS build

COPY . .

RUN pnpm --filter web build

FROM base AS development

ENV CI=true

EXPOSE 3000
