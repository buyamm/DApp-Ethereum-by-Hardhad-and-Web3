const hre = require("hardhat");

async function main() {
  console.log("Deploying SimpleToken contract...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  const token = await SimpleToken.deploy();
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("SimpleToken deployed to:", tokenAddress);

  const totalSupply = await token.totalSupply();
  console.log("Total Supply:", hre.ethers.formatEther(totalSupply), "STK");

  const deployerBalance = await token.balanceOf(deployer.address);
  console.log(
    "Deployer balance:",
    hre.ethers.formatEther(deployerBalance),
    "STK"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
