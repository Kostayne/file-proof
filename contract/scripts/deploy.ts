import { ethers } from "hardhat";

async function main() {
  const proof = await ethers.deployContract("Proof");

  await proof.waitForDeployment();

  console.log(
    `File proof deployed to ${proof.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
