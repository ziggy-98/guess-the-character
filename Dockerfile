# ----------------------------
# Stage 1
# Base image contains the updated OS and
# It also configures the non-root user that will be given permission to copied files/folders in every subsequent stages
FROM node:14-alpine3.12 AS base
RUN mkdir -p /usr/src/app && \
    addgroup -g 1001 appuser && \
    adduser -S -u 1001 -G appuser appuser && \
    chown -R appuser:appuser /usr/src/app && \
    chmod -R +x  /usr/src/app && \
    apk update && \
    apk add --no-cache bash git

# ----------------------------
# Stage 2
# Cache layer contains npm packages for all workspaces
# It will re-run only if one of the copied files change, otherwise this stage is cached
FROM base AS dependencies
WORKDIR /usr/src/app
COPY --chown=appuser:appuser package.json tsconfig.json webpack.config.js babel.config.js  ./
USER 1001

# ----------------------------
# Stage 3
# Build stage
FROM dependencies AS build
WORKDIR /usr/src/app
ARG LAST_COMMIT
ARG LAST_TAG
ENV LAST_COMMIT=$LAST_COMMIT
ENV LAST_TAG=$LAST_TAG
COPY --chown=appuser:appuser ./server ./server/
COPY --chown=appuser:appuser ./client ./client/
RUN npm install
RUN npm run build
USER 1001
EXPOSE 3000
CMD [ "npm", "start" ]
