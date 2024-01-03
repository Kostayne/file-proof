FROM node:18-alpine
WORKDIR /app

# deps
COPY package.json .
COPY package-lock.json .
RUN NODE_ENV=development npm install

# src
COPY ./test ./test
COPY ./contracts ./contracts
COPY ./scripts ./scripts
COPY ./hardhat.config.ts .
COPY ./tsconfig.json .

COPY ./startup.sh .

CMD ["npm", "run", "node"]