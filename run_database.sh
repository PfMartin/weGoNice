#!/bin/bash

podman run \
  --name weGoNice-database \
  --detach \
  --rm \
  --env-file /home/martin/Projects/weGoNice/backend/Database.env \
  --volume /home/martin/weGoNice/database:/var/lib/postgresql/data \
  --pod weGoNice-api-pod \
  docker.io/library/postgres:13.4
