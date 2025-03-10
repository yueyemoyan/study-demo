# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

 这是一个简单的合约TodoList



配置.env文件
将env.example文件重命名为.env，并修改一下参数为正确的参数

`SEPOLIA_ALCHEMY_AK   #在alchemy申请的应用的私钥`

`SEPOLIA_PK_ONE  #账户1的私钥`

`SEPOLIA_PK_TWO  #账户2的私钥`



部署合约使用

`npx hardhat run --network sepolia deploy/deploy.js`

控制台会打印合约的地址
