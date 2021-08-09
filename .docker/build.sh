#!/usr/bin/env bash

PATH=$(dirname "$0")
DOCKER_IMAGE_TAG='notice-app'

/usr/local/bin/docker build -t ${DOCKER_IMAGE_TAG} "${PATH}"