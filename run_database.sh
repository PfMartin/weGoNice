#!/bin/bash

podman run \
  --name weGoNice-database \
  --detach \
  --rm \
<<<<<<< HEAD:run_database.sh
  --env-file /home/martin/Projects/weGoNice/backend/Database.env \
  --volume /home/martin/weGoNice/database:/var/lib/postgresql/data \
=======
  --env-file /home/martin/Projects/weGoNice/backend/deployment/Database.env \
  --volume /home/martin/database-volume:/var/lib/postgresql/data \
>>>>>>> 0a9d7dd09cfc9d2ddea2fc41ed963f3f1158c8d5:backend/deployment/run_database.sh
  --pod weGoNice-api-pod \
  docker.io/library/postgres:13.4
