# Бот: Node сам запускает TypeScript, ничего не собирается. Контекст сборки -- корень
# репозитория, так как раскладку субтитров бот делит с сайтом через src/shared.

FROM node:26.11.1-alpine AS typography
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev --no-audit --no-fund --loglevel=error

FROM node:26.11.1-alpine

# ffmpeg в Alpine собран с libass и без X11, GL и кодеков, которые тянет за собой
# Debian: образ меньше половины прежнего. Шрифт лежит в src/bot/fonts -- тот самый,
# на котором настраивались субтитры.
RUN apk add --no-cache ffmpeg

WORKDIR /app
ENV NODE_ENV=production \
    DATA_DIR=/data
COPY deploy/bot-runtime/package.json deploy/bot-runtime/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev --no-audit --no-fund --loglevel=error
COPY package.json ./
COPY --from=typography /app/node_modules/@aimuzov/infra-site-kit/site/typograph.js ./node_modules/@aimuzov/infra-site-kit/typograph.js
RUN printf '%s\n' '{"type":"module","exports":{"./typograph.js":"./typograph.js"}}' > node_modules/@aimuzov/infra-site-kit/package.json
COPY src/shared ./src/shared
COPY src/bot ./src/bot
# под root, как и раньше: файлы, которые сервер Bot API отдаёт через общий том,
# принадлежат root
CMD ["node", "src/bot/main.ts"]
