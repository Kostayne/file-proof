FROM node:19.2-alpine3.15 as build

WORKDIR /app

# copy deps
COPY ./package.json .
COPY ./package-lock.json .

# install deps
RUN npm ci

# copy code
COPY . .

# build the proj
RUN npm run build

# prod img
FROM node:19.2-alpine3.15 as prod

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server ./server
COPY --from=build /app/dist ./dist

EXPOSE 3000

# running the client server
CMD ["node", "server/entry.express.js"]