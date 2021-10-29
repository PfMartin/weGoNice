#!/bin/bash

echo "Which version of the app do you want to transfer?"
read version

echo -e "\nTagging images with version ${version}"
podman tag wegonice-frontend-image wegonice-frontend-image:${version}
podman tag wegonice-frontend-image wegonice-backend-image:${version}
