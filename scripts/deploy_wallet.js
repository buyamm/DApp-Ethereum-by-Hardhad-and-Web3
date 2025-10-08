const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Bắt đầu deploy SimpleWallet contract...");

  // Deploy contract
  const SimpleWallet = await hre.ethers.getContractFactory("SimpleWallet");
  const wallet = await SimpleWallet.deploy();

  await wallet.waitForDeployment();

  const contractAddress = await wallet.getAddress();

  console.log("✅ SimpleWallet deployed to:", contractAddress);

  // Tạo thư mục contracts trong frontend nếu chưa có
  const contractsDir = path.join(__dirname, "../frontend/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
    console.log("📁 Đã tạo thư mục frontend/src/contracts/");
  }

  // Lưu contract address
  const addressFile = path.join(contractsDir, "wallet-address.json");
  fs.writeFileSync(
    addressFile,
    JSON.stringify({ SimpleWallet: contractAddress }, null, 2)
  );
  console.log("✅ Đã lưu contract address vào:", addressFile);

  // Lưu ABI
  const WalletArtifact = await hre.artifacts.readArtifact("SimpleWallet");
  const abiFile = path.join(contractsDir, "SimpleWallet.json");
  fs.writeFileSync(abiFile, JSON.stringify(WalletArtifact, null, 2));
  console.log("✅ Đã lưu ABI vào:", abiFile);

  // Test contract bằng cách gửi ETH vào
  const [deployer] = await ethers.getSigners();
  console.log("\n🧪 Testing contract...");
  console.log("   Deployer address:", deployer.address);
  console.log(
    "   Deployer balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH"
  );

  console.log("\n" + "=".repeat(70));
  console.log("📋 THÔNG TIN CONTRACT:");
  console.log("=".repeat(70));
  console.log("   Contract Address:", contractAddress);
  console.log("   Network: Hardhat Local (localhost:8545)");
  console.log("   Chain ID: 31337");
  console.log("=".repeat(70));
  console.log("\n⚠️  BƯỚC TIẾP THEO:");
  console.log("   1. Copy contract address ở trên");
  console.log("   2. Mở frontend/src/App.js");
  console.log("   3. Cập nhật CONTRACT_ADDRESS");
  console.log("   4. Chạy: cd frontend && npm start");
  console.log("=".repeat(70) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Lỗi deploy:", error);
    process.exit(1);
  });
