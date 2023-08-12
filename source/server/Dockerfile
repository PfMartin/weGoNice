FROM ubuntu:latest

WORKDIR /app

RUN mkdir -p /app/cmd
COPY ./cmd/wegonice-backend /app/cmd/wegonice-backend
RUN chmod +x ./cmd/wegonice-backend

EXPOSE 8000

CMD ["./cmd/wegonice-backend"]