#!/bin/bash

podman run \
  --name weGoNice-api \
  --detach \
  --rm \
  --pod weGoNice-api-pod \
  wegonice-backend-image
