import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import 'dotenv/config';

import { getFileProofRouter } from './routers/fileProof.router';
import { FileProofService } from './services/fileProof.service';
import { errorMiddleware } from './middlewares/error.middleware';
import { createContract } from './infrastructure/eth';

const setupServer = async () => {
    const app = express();
    const server = createServer(app);

    // needed for cors
    const clientHost = process.env.FILE_PROOF_CLIENT_HOST || 'http://0.0.0.0:3000';

    const io = new SocketIOServer(server, {
        cors: {
            origin: clientHost,
            methods: ['GET', 'POST'],
        },
    });

    app.use(cors({
        origin: clientHost,
    }));

    app.use(fileUpload());
    app.use(express.static('public'));

    // creating contract
    const contract = await createContract();

    // creating routes with services
    const fileProofService = new FileProofService(io, contract);
    const fileProofRouter = getFileProofRouter(fileProofService);

    app.get('/', (_, res) => {
        res.send('Hello from backend!');
    });

    app.use('/api/v1', fileProofRouter);
    app.use(errorMiddleware);

    const serverPort = parseInt(process.env.FILE_PROOF_SERVER_PORT || '3005');
    const serverHost = process.env.FILE_PROOF_SERVER_HOST || '127.0.0.1';

    server.listen(serverPort, serverHost, () => {
        console.log(`Started server at ${serverHost}:${serverPort}`);
    });
};

setupServer();