// import Web3 from "web3"

// const provider = new Web3.providers.HttpProvider(
//     "https://sepolia.infura.io/v3/75ca1af57eb84307852146e43beb438e"
// )

// const web3 = new Web3(provider)

const abi= [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vendingMachineContract = web3 => {
    return new web3.eth.Contract(abi, "0x848C2c323157B00E789C127a5e66A793E89Dc2ba")
}

export default vendingMachineContract