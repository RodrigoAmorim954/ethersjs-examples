const { ethers } = require("ethers")
require("dotenv").config()
const { abi } = require("./constants/abiLink")

const INFURA_ID = process.env.INFURA_ID
const PRIVATE_KEY = process.env.PRIVATE_KEY

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account3 = "0x1b072A3ea6e98911649e46f0bBC73C826673381e" // sender
const account1 = "0xBA908d16fF469D42E38cfb5efdF513e64Fe14e7b" // recipient

const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
const address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB" // Address Link Goerli

const contract = new ethers.Contract(address, abi, provider)

const main = async () => {
    const senderBalanceBefore = await contract.balanceOf(account3)
    const receiverBalanceBefore = await contract.balanceOf(account1)

    console.log(`Balance of sender is: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`Balance of receiver is: ${ethers.utils.formatEther(receiverBalanceBefore)}`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account1, ethers.utils.parseEther("1"))
    await tx.wait()

    const senderBalanceAfter = await contract.balanceOf(account3)
    const receiverBalanceAfter = await contract.balanceOf(account1)

    console.log(`Balance of sender is: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`Balance of receiver is: ${ethers.utils.formatEther(receiverBalanceAfter)}`)
}

main()
