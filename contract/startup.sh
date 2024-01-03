#!/bin/sh

# navigate to the app directory
cd /app

# start a local blockchain node
npm run node:docker &

# wait for the node to be ready
npx wait-on http://file-proof-hardhat-1:8545 && npm run deploy:docker

# wait till the node process ends
# this prevents the container from exiting
wait $!