// 部署js文件
const { ethers, upgrades } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("deployer: ", deployer.address)

  // 部署todoList合约
//   const TodoList = await ethers.getContractFactory("TodoList")
//   const todoListInstance = await TodoList.deploy()
//   console.log("Contract deployed to:", await todoListInstance.getAddress())

  // todoList合约地址
  let todoListAddress = "0x976Ca615520F8e524c2C97428d573041Bf3Cc608"
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
