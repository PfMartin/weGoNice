podman run \
  --name weGoNice-frontend \
  --detach \
  --restart=always \
  -p 3000:3000 \
  wegonice-frontend-image
