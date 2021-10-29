#!/bin/bash

podman run \
  --name weGoNice-frontend \
  -it \
  --restart=always \
  -p 3000:5000 \
  wegonice-frontend-image
