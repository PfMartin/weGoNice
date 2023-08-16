#!/bin/bash

set -e

cd ./cmd

ARCH=$(uname -m)
case "$ARCH" in
  armv7l)
    ./wegonice-backend-armv7
    ;;
  arch64)
    ./wegonice-backend-arm64
    ;;
  x86_64)
    ./wegonice-backend-amd64
    ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac