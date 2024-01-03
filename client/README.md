# File proof / Client
A frontend built with qwik.

## Docker
It's way easier to use docker compose file in the project root, it will start all services in one command.
```
docker compose up
```

### Docker | client only
Build an image
```
docker build -t fp-client .
```

Run the image
```
docker run -d -p 3000:3000 fp-client
```

## Local dev
### Install dependencies
```
npm i
```

### Development mode
Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

### Preview mode
The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

### Production mode
The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```

### Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
