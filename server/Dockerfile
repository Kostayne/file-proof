FROM node:18-alpine as builder
WORKDIR /app

# deps
COPY package.json .
COPY package-lock.json .

# install deps
RUN npm ci

# src & contracts
COPY ./src ./src
COPY ./contracts ./contracts

# cfg
COPY tsconfig.json .

# env
COPY *.env .

# build
RUN npm run build

FROM node:18-alpine as prod
WORKDIR /app

# cp general files
# COPY local.env .:w

COPY package.json .
COPY ./contracts ./contracts

# cp build files
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3005

CMD ["npm", "run", "start"]