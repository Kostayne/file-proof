# File proof / Contract
Here is a set up hardhat suite, it compiles and deploys a smart contract to a local block chain.

## Docker
It's way easier to use docker compose file in the project root, it will start all services in one command.
```
docker compose up
```

### Docker | contract only
Build an image
```
docker build -t fp-hardhat .
```

Run the image
```
docker run -d -p 8545:8545 fp-hardhat
```

Deploy the contract
```
docker exec -it fp-hardhat "npm run deploy"
```

## Local development
Compile the contract:
```
npm run compile
```

Start a local block chain node:
```
npm run node
```

Deploy the contract:
```
npm run deploy
```

Run tests:
```
npm run test
```

