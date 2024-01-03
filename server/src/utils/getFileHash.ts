import SHA3 from 'sha3';

export function getFileHash(fileData: Buffer) {
    const hashFn = new SHA3(512);

    hashFn.update(fileData);
    return hashFn.digest().toString('hex');
}