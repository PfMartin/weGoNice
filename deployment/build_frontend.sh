#!/bin/bash

cd ../source/frontend

buildah bud -f Container_file_frontend -t wegonice-frontend-image .
