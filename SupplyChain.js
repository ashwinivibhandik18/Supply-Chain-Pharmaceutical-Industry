const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SupplyChain", function () {
    it("Should return the new product once it is added", async function () {
        const Users = await ethers.getContractFactory("Users")
        const Products = await ethers.getContractFactory("Products")
        const SupplyChain = await ethers.getContractFactory("SupplyChain")
        const users = await Users.deploy()
        const products = await Products.deploy()
        const supplyChain = await SupplyChain.deploy(
            "Aditya Awasthi",
            "adityaawasthi.30@smail.com"
        )

        await users.deployed()
        await products.deployed()
        await supplyChain.deployed()
        const [owner, addr1] = await ethers.getSigners()

        const user_ = await supplyChain.connect(addr1).addParty({
            id_: "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
            name: "Sanchit",
            email: "sanchitjain@gmail.com",
            role: 1,
        })

        await user_.wait()
        console.log(user_)

        let manufacturer = "Bharat Biotech"

        const addedProduct_ = await supplyChain.connect(addr1).addProduct(
            {
                manufacturerName: manufacturer,
                manufacturer: addr1.toString(),
                manDateEpoch: 1682890800, // 01 May 2023 03:11:00
                expDateEpoch: 1714513200, // 01 May 2024 03:11:00
                isInBatch: true,
                batchCount: 100,
                barcodeId: "p1",
                productImage: "",
                productType: "RNA",
                scientificName: "SARS-COVID-19",
                usage: "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
                composition: ["SO2 - 15%", "O2 - 30%"],
                sideEffects: ["Headache", "Motions"],
            },
            1682890800
        )

        // wait for 6 blocks confirmation
        await addedProduct_.wait(6)
        const singleProduct_ = await supplyChain.getSingleProducts("p1")
        console.log(singleProduct_)

        const _sellProduct = await supplyChain
            .connect(addr1)
            .sellProduct(
                "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                "p1",
                1682890800
            )

        // wait for 6 blocks confirmation
        await _sellProduct.wait(6)
        console.log(_sellProduct)

        assert.equal(
            singleProduct_[0].manufacturerName.toString(),
            manufacturer
        )
        // expect(singleProduct_[0].manufacturerName.toString()).to.equal(manufacturer)
    })
})
