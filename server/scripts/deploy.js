const { ethers } = require("hardhat")

const deployContract=async()=>{
  const contractFactory=await ethers.getContractFactory('NextPay')
  const contract=await contractFactory.deploy()
  await contract.deployed()

  console.log("contract deploy success:"+contract.address);
}


const main=async()=>{
  try {
    await deployContract()
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

main()