#!/bin/bash

podman run \
  --name weGoNice-api \
  --detach \
  --rm \
  --env-file /home/martin/Projects/weGoNice/backend/Database.env \
  --pod weGoNice-api-pod \
  wegonice-backend-image
