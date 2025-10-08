const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Bắt đầu deploy SimpleStorage contract...");

  // Deploy contract (ethers v6 syntax)
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  // Đợi deployment hoàn tất (ethers v6)
  await simpleStorage.waitForDeployment();

  // Lấy contract address (ethers v6)
  const contractAddress = await simpleStorage.getAddress();

  console.log("✅ SimpleStorage deployed to:", contractAddress);

  // Tạo thư mục contracts trong frontend nếu chưa có
  const contractsDir = path.join(__dirname, "../frontend/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
    console.log("📁 Đã tạo thư mục frontend/src/contracts/");
  }

  // Lưu contract address
  const addressFile = path.join(contractsDir, "contract-address.json");
  fs.writeFileSync(
    addressFile,
    JSON.stringify({ SimpleStorage: contractAddress }, null, 2)
  );
  console.log("✅ Đã lưu contract address vào:", addressFile);

  // Lưu ABI
  const SimpleStorageArtifact = await hre.artifacts.readArtifact(
    "SimpleStorage"
  );
  const abiFile = path.join(contractsDir, "SimpleStorage.json");
  fs.writeFileSync(abiFile, JSON.stringify(SimpleStorageArtifact, null, 2));
  console.log("✅ Đã lưu ABI vào:", abiFile);

  console.log("\n" + "=".repeat(60));
  console.log("📋 THÔNG TIN QUAN TRỌNG:");
  console.log("=".repeat(60));
  console.log("   Contract Address:", contractAddress);
  console.log("   Network: Hardhat Local (localhost:8545)");
  console.log("   Chain ID: 31337");
  console.log("=".repeat(60));
  console.log("\n⚠️  BƯỚC TIẾP THEO:");
  console.log("   1. Copy contract address ở trên");
  console.log("   2. Mở frontend/src/App.js");
  console.log("   3. Thay đổi dòng:");
  console.log('      const CONTRACT_ADDRESS = "' + contractAddress + '";');
  console.log("=".repeat(60) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Lỗi deploy:", error);
    process.exit(1);
  });
