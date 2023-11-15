require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("chai")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const REPORT_GAS = process.env.REPORT_GAS
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    solidity: {
        version: "0.8.8",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS !== undefined,
        outputFile: "gas-report.txt",
        currency: "INR",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
