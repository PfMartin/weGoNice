#!/bin/bash

echo "What's the target version of the images?"
read version

echo -e "\nTagging images with version ${version}"
podman tag wegonice-frontend-image wegonice-frontend-image:${version}
podman tag wegonice-frontend-image wegonice-backend-image:${version}
