const { ethers } = require("ethers")
require("dotenv").config()

const INFURA_ID = process.env.INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account3 = "0x1b072A3ea6e98911649e46f0bBC73C826673381e" // sender
const account1 = "0xBA908d16fF469D42E38cfb5efdF513e64Fe14e7b" // recipient

const PRIVATE_KEY = process.env.PRIVATE_KEY // sender private key

const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account3)
    const receiverBalanceBefore = await provider.getBalance(account1)

    console.log(
        `Sender Balance before transaction: ${ethers.utils.formatEther(senderBalanceBefore)}`
    )
    console.log(
        `Receiver Balance before transaction: ${ethers.utils.formatEther(receiverBalanceBefore)}`
    )

    // Send Ether
    const tx = await wallet.sendTransaction({
        to: account1,
        value: ethers.utils.parseEther("0.05"),
    })

    await tx.wait() // wait for the transaction to be mined

    const senderBalanceAfter = await provider.getBalance(account3)
    const receiverBalanceAfter = await provider.getBalance(account1)

    console.log(
        `Sender Balance before transaction: ${ethers.utils.formatEther(senderBalanceAfter)}`
    )
    console.log(
        `Receiver Balance before transaction: ${ethers.utils.formatEther(receiverBalanceAfter)}`
    )
}

main()
