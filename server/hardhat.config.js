require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config()



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
      sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SCANTECH_URL}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan:{
    apikey:{
      sepolia:process.env.API_KEY_ETHER
    }
  },
  sourcify: {
    enabled: true
  }
};


