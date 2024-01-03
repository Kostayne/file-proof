import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",

  networks: {
    docker: {
      url: "http://file-proof-hardhat-1:8545",
    }
  }
};

export default config;
