const { hre, ethers, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async function main() {
    console.log("Deploying contracts...")
    const TypesFactory = await ethers.getContractFactory("Types")
    const types = await TypesFactory.deploy()
    await types.deployed()

    const Users = await ethers.getContractFactory("Users")

    const ProductsFactory = await ethers.getContractFactory("Products")
    const SupplyChainFactory = await ethers.getContractFactory("SupplyChain")

    const users = await Users.deploy()
    const products = await ProductsFactory.deploy()
    const supplyChain = await SupplyChainFactory.deploy(
        "Aditya Awasthi",
        "adityaawasthi.30@gmail.com"
    )

    await users.deployed()
    await products.deployed()
    await supplyChain.deployed()

    console.log("Types deployed to:", types.address)
    console.log("Users deployed to:", users.address)
    console.log("Products deployed to:", products.address)
    console.log("SupplyChain deployed to:", supplyChain.address)

    console.log("-------------------------------------------------------------")

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await users.deploymentTransaction.wait(6)
        await verify(users.address, [])

        await products.deploymentTransaction.wait(6)
        await verify(products.address, [])

        await supplyChain.deploymentTransaction.wait(6)
        await verify(supplyChain.address, [
            "Aditya Awasthi",
            "adityaawasthi.30@gmail.com",
        ])
    }

    console.log("-------------------------------------------------------------")
}

module.exports.tags = ["all"]
