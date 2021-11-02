#!/bin/bash

podport="8000"
database_env="/home/server/weGoNice/source/backend/Database.env"
database_volume="/home/server/weGoNice/weGoNice-database"

echo "Which version of the app do you want to run?"
read version

podman pod ps | grep weGoNice-api-pod

if [[ $? == 0 ]]
then
  echo "Stopping and removing the running pod"
  podman pod stop weGoNice-api-pod && podman pod rm weGoNice-api-pod
fi

echo -e "Creating the pod weGoNice-api-pod listening on ${podport}:8000"
podman pod create --name weGoNice-api-pod --publish 8000:8000

podman run \
  --name weGoNice-database \
  --detach \
  --rm \
  --env-file ${database_env} \
  --volume ${database_volume}:/var/lib/postgresql/data \
  --pod weGoNice-api-pod \
  docker.io/library/postgres:13.4

podman run \
  --name weGoNice-api \
  --detach \
  --rm \
  --env-file ${database_env} \
  --pod weGoNice-api-pod \
  wegonice-backend-image:${version}

exit 0
