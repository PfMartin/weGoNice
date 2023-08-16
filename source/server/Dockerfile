FROM debian:latest

WORKDIR /app

ENV ACCESS_SECRET=secret-key
ENV ADMIN_EMAIL=wego@nice.com
ENV DATABASE_NAME=weGoNice
ENV DATABASE_USERNAME=NiceUser
ENV DATABASE_PASSWORD=nicePassword

RUN mkdir -p /app/cmd

COPY ./cmd/wegonice-backend-amd64 /app/cmd/wegonice-backend-amd64
COPY ./cmd/wegonice-backend-arm64 /app/cmd/wegonice-backend-arm64

RUN chmod +x ./cmd/wegonice-backend-amd64
RUN chmod +x ./cmd/wegonice-backend-arm64

COPY ./run_backend.sh ./run_backend.sh

EXPOSE 8000

CMD ["./run_backend.sh"]