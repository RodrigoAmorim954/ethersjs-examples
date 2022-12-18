const { ethers } = require("ethers")
require("dotenv").config()
const { abi } = require("./constants/abi")

const INFURA_ID = process.env.INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F" // dai contract
const contract = new ethers.Contract(address, abi, provider) // We need the contract address, the abi and the provider to connect to the contract by ethers.Contract
const account = "0x1977fa556013Fa7Ef5Ec4e98231e531188C46978"

const main = async () => {
    const name = await contract.totalSupply()
    console.log(`Total supply: ${name.toString()}`)
    const balance = await contract.balanceOf(account)
    console.log(`Balance:${ethers.utils.formatEther(balance)}`)
}

main()
