import { expect } from 'chai';
import { ethers } from "hardhat";
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';

describe('Proof contract', () => {
    async function deployTokenFixture() {
        // deploying the contract
        const [owner] = await ethers.getSigners();
        const fp = await ethers.deployContract('Proof');

        // setting file owner
        const setResp = await fp.set('Test usr', 'test_hash');
        return {fp, owner, setResp};
    }

    it('Get should return owner info by hash', async () => {
        const {fp} = await loadFixture(deployTokenFixture);
        const [timestamp, ownerName] = await fp.get('test_hash');

        expect(timestamp).greaterThan(0);
        expect(ownerName).equal('Test usr');
    });

    it('Get should return nullable info by unknown hash', async () => {
        const {fp} = await loadFixture(deployTokenFixture);
        const [timestamp, ownerName] = await fp.get('new_hash');

        expect(timestamp).to.eq(0);
        expect(ownerName).equal('');
    });
});