#!/bin/bash

podman run \
  --name weGoNice-api \
  -it \
  --rm \
  --env-file /home/martin/Projects/weGoNice/backend/deployment/Database.env \
  --pod weGoNice-api-pod \
  wegonice-backend-image
