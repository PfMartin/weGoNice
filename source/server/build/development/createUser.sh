#!/bin/bash

docker exec weGoNice-test-db \
  mongosh weGoNice -u TestUser -p testPassword --authenticationDatabase admin \
  --eval "db.createUser({user: 'TestUser', pwd: 'testPassword', roles: [{role: 'readWrite', db: 'weGoNice'}]})"