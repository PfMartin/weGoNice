#!/bin/bash

podman run \
  --name weGoNice-frontend \
  --detach \
  --restart=always \
  -p 5000:5000 \
  wegonice-frontend-image
