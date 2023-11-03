#!/bin/bash
set -x
set -e

# deploy deeplink: https://nomo.app/pluginv1/tokens.nomo.app/tokengenerator.tar.gz

RELEASE_FILE=tokengenerator.tar.gz
DEPLOY_PATH=/var/www/tokengenerator/$RELEASE_FILE

if [[ -n "$SSH_TARGET" ]]; then
    echo "Deploying to SSH_TARGET: $SSH_TARGET"
else
    echo "Error: The environment variable SSH_TARGET is not set."
    exit -1
fi

ls -l $RELEASE_FILE # ls to check if release file exists
scp $RELEASE_FILE $SSH_TARGET:$DEPLOY_PATH

./scripts/clear_cloudflare_cache.sh
