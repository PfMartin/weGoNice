#!/bin/bash

cd ../source/backend

buildah bud -f Container_file_api -t wegonice-backend-image .
