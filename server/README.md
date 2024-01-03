# File proof / Server
Here is backend for file proof dApp

## Docker
It's way easier to use docker compose file in the project root, it will start all services in one command.
```
docker compose up
```

### Docker | server only
Build an image
```
docker build -t fp-server .
```

Run the image
```
docker run -d -p 3005:3005 fp-server
```

## Scripts
Install deps
```
npm i
```

Start a dev server
```
npm run dev
```

Build a prod bundle
```
npm run build
```

Start a prod build
```
npm run start
```

## Endpoints
- [get] /
    ```
    Hello from backed!
    ```
    
- [post] /submit?owner=string
    
    Body: Form data { file: some file }
    ```
    {
        "_type": "TransactionReceipt",
        "accessList": [],
        "blockNumber": 2,
        "blockHash": "0x094e0969fcfaecd476efff91ab894abbcc2b1aabcf1f735d3e526edf27ceac74",
        "chainId": "31337",
        "data": "0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000084b6f737461796e6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000803236306536323339653164616233333936636561326562383535393930306234346239663830613838303838306638376263333537333265393439393962333861373539663766653437633861386535316565393632333138633136353066653562653334613838313837363232316561663539343634633165396635373733",
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "gasLimit": "74980",
        "gasPrice": "1770155678",
        "hash": "0x3c1b6b0f16935eeec1da6f684a342561aed7b2cfc7ba3fdf2d5eeed38e2d5618",
        "maxFeePerGas": "2540311356",
        "maxPriorityFeePerGas": "1000000000",
        "nonce": 1,

        "signature": {
            "_type": "signature",
            "networkV": null,
            "r": "0xc19848f744d959840bef7bef233ceec5c59b6299af3874c981dcd427f97f9a16",
            "s": "0x13b4ccc146f6707405624f034f3e6bb0c19e4cb03469a9db307ea130a21e2cb8",
            "v": 28
        },

        "to": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        "type": 2,
        "value": "0"
    }
    ```

    - [post] /get

    Body: Form data { file: some file }
    ```
    [1704216096,"Kostayne"] // time stampm, file owner
    ```