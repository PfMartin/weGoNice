#!/bin/bash

podman run \
  --name weGoNice-database \
  --detach \
  --rm \
  --env-file /home/martin/Projects/weGoNice/backend/deployment/Database.env \
  --pod weGoNice-api-pod \
  docker.io/library/postgres:13.4
