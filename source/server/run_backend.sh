#!/bin/bash

set -e

cd ./cmd

BINARY_NAME=wegonice-backend

ARCH=$(uname -m)
case "$ARCH" in
  aarch64)
    ./$BINARY_NAME-arm64
    ;;
  x86_64)
    ./$BINARY_NAME-amd64
    ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac