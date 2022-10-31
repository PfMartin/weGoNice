#!/bin/bash

# https://gist.github.com/sarjarapu/761e4fc1ea7c5d46f1fb64d973d5a6bf
docker exec weGoNice-test-db \
  mongosh weGoNice -u TestUser -p testPassword --authenticationDatabase admin \
  --eval "db.createUser({user: 'TestUser', pwd: 'testPassword', roles: [{role: 'readWrite', db: 'weGoNice'}]})"