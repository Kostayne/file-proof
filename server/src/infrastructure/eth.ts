import { join } from 'path';
import { readFile } from 'fs/promises';
import { Contract, ethers } from 'ethers';

const providerStr = process.env.FILE_PROOF_WEB3_PROVIDER || 'http://127.0.0.1:8545'
console.log(`Using provider: ${providerStr}`);

export const provider = new ethers.JsonRpcProvider(providerStr);

export const createContract = async () => {
    const infoPath = join(__dirname, '../../contracts/Proof.json');

    const contractInfoBuff = await readFile(infoPath);
    const contractInfo = JSON.parse(contractInfoBuff.toString());
    const signer = await provider.getSigner();

    return new Contract(process.env.FILE_PROOF_CONTRACT_ADDR as string, contractInfo.abi, signer);
};