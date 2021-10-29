#!/bin/bash

podman ps | grep weGoNice-frontend
if [[ $? == 0 ]]
then
  echo "Stopping and removing the container"
  podman stop weGoNice-frontend && podman rm weGoNice-frontend
fi

podman run \
  --name weGoNice-frontend \
  --detach \
  --restart=always \
  -p 5000:5000 \
  wegonice-frontend-image
