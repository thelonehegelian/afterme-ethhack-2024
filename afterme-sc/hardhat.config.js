const { sepolia } = require('viem/chains');

require('@nomiclabs/hardhat-ethers');
// require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
  },
  ignore: [
    "contracts/LitAccess.sol"
  ],
  // networks: {
  //   yellowstone: {
  //     url: "https://yellowstone-rpc.litprotocol.com/",
  //     chainId: 175188,
  //     accounts: [`0x${process.env.PRIVATE_KEY}`]  // Add your private key
  //   },
  // },
    networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/pT-OnDUxFUjw3cKKie5i7_xCEiRALJxe",
      chainId: 11155111,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
};
