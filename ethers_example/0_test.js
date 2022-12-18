const { ethers } = require("ethers")
require("dotenv").config()

const INFURA_ID = process.env.INFURA_ID
const PRIVATE_KEY = process.env.PRIVATE_KEY

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`) // We need a provider so we can connect to a wallet or write/read

const account1 = "0xBA908d16fF469D42E38cfb5efdF513e64Fe14e7b"
const account3 = "0x1b072A3ea6e98911649e46f0bBC73C826673381e"

// const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
const main = async () => {
    const balance1 = await provider.getBalance(account1)
    const balance3 = await provider.getBalance(account3)

    console.log("Balance of Account 1 is:", ethers.utils.formatEther(balance1))
    console.log("Balance of Account 3 is:", ethers.utils.formatEther(balance3))
}

main()
