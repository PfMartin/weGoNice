FROM debian:latest

WORKDIR /app

ENV ACCESS_SECRET=secret-key
ENV ADMIN_EMAIL=wego@nice.com
ENV DATABASE_NAME=weGoNice
ENV DATABASE_USERNAME=NiceUser
ENV DATABASE_PASSWORD=nicePassword

RUN mkdir -p /app/cmd
COPY ./cmd/wegonice-backend /app/cmd/wegonice-backend
RUN chmod +x ./cmd/wegonice-backend

EXPOSE 8000

WORKDIR /app/cmd

CMD ["./wegonice-backend"]