# Code runner image for Render (or any container host). Build from the repo root:
#   docker build -f server/Dockerfile -t stepcode-runner .
FROM node:22-bookworm-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends openjdk-17-jdk-headless \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY server ./server
# Run as an unprivileged user so submitted code cannot touch the image
RUN useradd --create-home --shell /usr/sbin/nologin runner
USER runner
ENV NODE_ENV=production PORT=10000 RUNNER_LANGUAGES=java
EXPOSE 10000
CMD ["node", "server/index.js"]
