require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // 加载环境变量
require("hardhat-deploy")


const SEPOLIA_PK_ONE = process.env.SEPOLIA_PK_ONE
const SEPOLIA_PK_TWO = process.env.SEPOLIA_PK_TWO

if (!SEPOLIA_PK_ONE) {
  throw new Error("Please set at least one private key in a .env file")
}

const SEPOLIA_ALCHEMY_AK = process.env.SEPOLIA_ALCHEMY_AK
if (!SEPOLIA_ALCHEMY_AK) {
  throw new Error("Please set your SEPOLIA_ALCHEMY_AK in a .env file")
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  settings: {
    optimizer: {
      enabled: true,
      runs: 50,
    },
    viaIR: true,
  },
  networks: {
    // mainnet: {
    //   url: `https://eth-mainnet.g.alchemy.com/v2/${MAINNET_ALCHEMY_AK}`,
    //   accounts: [`${MAINNET_PK}`],
    //   saveDeployments: true,
    //   chainId: 1,
    // },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHEMY_AK}`,
      accounts: [`${SEPOLIA_PK_ONE}`, `${SEPOLIA_PK_TWO}`],
    },
    // optimism: {
    //   url: `https://rpc.ankr.com/optimism`,
    //   accounts: [`${MAINNET_PK}`],
    // },
  },
  metadata: {
    bytecodeHash: 'none',
  }
};
