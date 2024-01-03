import { Contract } from 'ethers';
import { Server as SocketIOServer } from 'socket.io';

// utils
import { getFileHash } from '../utils/getFileHash';

export class FileProofService {
    constructor(protected io: SocketIOServer, protected contract: Contract) {
        this.contract.on('logFileAddedStatus', (status: boolean, timeStamp: number, owner: string, hash: string, eventDetails: any) => {
            if (!status) {
                return;
            }

            this.emitTxEvent(hash, owner, eventDetails);
        });
    }

    async submit(fileData: Buffer, owner: string) {
        const hash = getFileHash(fileData);
        return this.contract.set(owner, hash);
    }

    async get(fileData: Buffer) {
        const hash = getFileHash(fileData);
        return this.contract.get(hash);
    }

    emitTxEvent(hash: string, owner: string, eventDetails: any) {
        this.io.emit('tx', 0, owner, hash, eventDetails.log.transactionHash);
    }
}