const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();

  console.log("\n=== HARDHAT NETWORK ACCOUNTS ===\n");

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const balance = await hre.ethers.provider.getBalance(account.address);

    console.log(`Account #${i}`);
    console.log(`Address: ${account.address}`);
    console.log(`Balance: ${hre.ethers.formatEther(balance)} ETH`);
    console.log("---");
  }

  console.log("\n=== NETWORK INFO ===");
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${hre.network.config.chainId}`);
  console.log(`RPC URL: http://127.0.0.1:8545`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
