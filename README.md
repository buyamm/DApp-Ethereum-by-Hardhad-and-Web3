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

# 🎯 Hướng Dẫn Sử Dụng Standalone Wallet DApp

## ✨ Tính Năng Chính

### ✅ Không Cần MetaMask

- Kết nối trực tiếp với Hardhat node qua RPC
- Quản lý nhiều ví trong một giao diện
- Tạo ví mới hoặc import từ private key

### ✅ Quản Lý Ví

- 5 ví Hardhat mặc định (mỗi ví 10,000 ETH)
- Tạo ví mới ngẫu nhiên
- Import ví từ private key
- Hiển thị balance real-time

### ✅ Transfer ETH

- Chuyển ETH giữa các ví
- Thêm message vào transaction
- Quick select người nhận từ danh sách
- Xem lịch sử giao dịch chi tiết

---

## 🚀 Bắt Đầu

### Bước 1: Deploy Contract

```bash
# Terminal 1: Start Hardhat Node
npx hardhat node

# Terminal 2: Deploy SimpleWallet
npx hardhat run scripts/deploy_wallet.js --network localhost
```

**⚠️ Copy contract address** từ output!

### Bước 2: Cập nhật Contract Address

Mở `frontend/src/App.js` và thay:

```javascript
const CONTRACT_ADDRESS = "ĐỊA_CHỈ_VỪA_DEPLOY";
```

### Bước 3: Start Frontend

```bash
cd frontend
npm start
```

DApp sẽ tự động:

- ✅ Kết nối với Hardhat (http://127.0.0.1:8545)
- ✅ Load 5 accounts Hardhat mặc định
- ✅ Hiển thị balance của từng account
- ✅ Load tất cả transactions trên network

---

## 📖 Hướng Dẫn Sử Dụng

### 1️⃣ Chọn Account

**Cách 1: Chọn từ danh sách**

- Nhìn sidebar bên trái
- Click vào account bất kỳ (Account #0 đến #4)
- Account được chọn sẽ có màu gradient tím

**Cách 2: Tạo ví mới**

1. Click nút **"+ Add"** ở sidebar
2. Click **"🆕 Create New Wallet"**
3. Ví mới được tạo với private key ngẫu nhiên
4. ⚠️ **LƯU LẠI PRIVATE KEY** được hiển thị!

**Cách 3: Import ví**

1. Click nút **"+ Add"** ở sidebar
2. Nhập private key vào ô input
3. Click **"📥 Import Wallet"**

---

### 2️⃣ Xem Thông Tin Ví

Sau khi chọn account, bạn sẽ thấy:

**📊 Wallet Information Card:**

- Address (địa chỉ ví)
- Balance (số dư ETH)
- Private key (nếu là ví mới tạo)

**🔄 Refresh Balance:**

- Click nút "🔄 Refresh Balance" để cập nhật

---

### 3️⃣ Thực Hiện Transfer

**Bước 1: Nhập thông tin**

- **Recipient Address:** Địa chỉ người nhận
  - Nhập thủ công: `0x...`
  - Hoặc click **Quick select** để chọn nhanh từ accounts
- **Amount:** Số ETH muốn gửi (ví dụ: `1.5`)
- **Message:** Ghi chú (tùy chọn)

**Bước 2: Gửi transaction**

- Click **"🚀 Send Transfer"**
- Đợi transaction confirm (~2-3 giây)
- Thông báo "✅ Transfer thành công!"

**Bước 3: Verify**

- Balance tự động cập nhật
- Transaction xuất hiện trong "My Transactions"
- Transaction xuất hiện trong "All Network Transactions"

---

### 4️⃣ Xem Lịch Sử Giao Dịch

**📋 My Transactions:**

- Hiển thị tất cả giao dịch liên quan đến account hiện tại
- **↗️ Sent** (màu đỏ): Giao dịch bạn gửi đi
- **↙️ Received** (màu xanh): Giao dịch bạn nhận được
- Thông tin: Amount, Địa chỉ, Message, Timestamp

**🌐 All Network Transactions:**

- Hiển thị tất cả giao dịch trên network
- Sắp xếp từ mới nhất đến cũ nhất
- Xem được toàn bộ hoạt động transfer trên mạng

---

## 💡 Ví Dụ Thực Tế

### Test Case 1: Transfer giữa 2 accounts Hardhat

**Bước 1:** Chọn Account #0

- Balance: 10000 ETH

**Bước 2:** Transfer đến Account #1

- Recipient: Click "Quick select" → chọn account #1
- Amount: `2.5`
- Message: "Payment for services"
- Click **Send Transfer**

**Bước 3:** Verify

- Account #0 balance: ~9997.5 ETH (trừ gas fee)
- Chuyển sang Account #1
- Account #1 balance: ~10002.5 ETH

**Bước 4:** Transfer ngược lại

- Từ Account #1 → Account #0
- Amount: `0.5`
- Message: "Refund"

---

### Test Case 2: Tạo ví mới và fund

**Bước 1:** Tạo ví mới

- Click **"+ Add"** → **"Create New Wallet"**
- Copy private key được hiển thị
- Ví mới có balance: 0 ETH

**Bước 2:** Fund ví mới

- Chọn Account #0 (có 10000 ETH)
- Transfer 5 ETH đến ví mới
- Chuyển về ví mới → thấy balance: 5 ETH

**Bước 3:** Sử dụng ví mới

- Ví mới giờ có thể transfer cho accounts khác

---

### Test Case 3: Import ví external

**Scenario:** Import ví từ private key có sẵn

**Bước 1:** Copy một trong các private keys từ Hardhat:

```
0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

**Bước 2:** Import

- Click **"+ Add"** → Paste private key
- Click **"Import Wallet"**
- Ví được thêm vào danh sách với balance ~10000 ETH

---

## 🎨 Giao Diện

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│              Standalone Wallet DApp                 │
│         No MetaMask Required - Direct RPC           │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│   Accounts   │        Wallet Information            │
│   ────────   │        ─────────────────             │
│   Account #0 │        Address: 0x...                │
│   Account #1 │        Balance: 10000 ETH            │
│   Account #2 │                                       │
│   Account #3 │        ─────────────────             │
│   Account #4 │        Transfer ETH                  │
│              │        ─────────────────             │
│   + Add      │        Recipient: [_______]          │
│              │        Amount: [_______]             │
│   Network    │        Message: [_______]            │
│   Info       │        [🚀 Send Transfer]            │
│              │                                       │
│              │        ─────────────────             │
│              │        My Transactions               │
│              │        ─────────────────             │
│              │        [Transaction list]            │
│              │                                       │
│              │        ─────────────────             │
│              │        All Network Transactions      │
│              │        ─────────────────             │
│              │        [All transactions]            │
└──────────────┴──────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### ❌ Cannot connect to Hardhat

**Lỗi:** "Không thể kết nối với Hardhat node"

**Giải pháp:**

1. Kiểm tra Hardhat node đang chạy:

```bash
npx hardhat node
```

2. Verify RPC URL: `http://127.0.0.1:8545`
3. Restart frontend

---

### ❌ No accounts showing

**Lỗi:** Không có accounts nào trong sidebar

**Giải pháp:**

1. Kiểm tra console.log trong browser (F12)
2. Verify contract đã deploy
3. Refresh page (F5)

---

### ❌ Transfer failed

**Lỗi:** "Lỗi transfer: insufficient funds"

**Nguyên nhân:** Account không đủ ETH

**Giải pháp:**

1. Kiểm tra balance của account
2. Giảm amount transfer
3. Hoặc fund thêm ETH vào account

---

### ❌ Transaction not showing

**Lỗi:** Transaction thành công nhưng không hiện trong history

**Giải pháp:**

1. Click **"🔄 Refresh Balance"**
2. Hoặc chuyển sang account khác rồi quay lại
3. Kiểm tra "All Network Transactions"

---

## 🔐 Bảo Mật

### ⚠️ Lưu Ý Quan Trọng

1. **Private Keys được hiển thị trong UI**

   - Chỉ dùng cho môi trường development/testnet
   - KHÔNG BAO GIỜ dùng trên mainnet
   - KHÔNG share private key với ai

2. **Ví mới tạo**

   - Lưu lại private key ngay sau khi tạo
   - Không có cách nào recover nếu mất

3. **Local Storage**
   - DApp KHÔNG lưu private keys vào localStorage
   - Mỗi lần refresh page phải import lại ví custom

---

## 🎯 So Sánh Với MetaMask Version

| Tính Năng          | MetaMask Version                 | Standalone Version             |
| ------------------ | -------------------------------- | ------------------------------ |
| **Setup**          | Cần cài MetaMask extension       | Không cần extension            |
| **Accounts**       | Import từng account vào MetaMask | Tự động load 5 accounts        |
| **Switch Account** | Switch trong MetaMask            | Click trong UI                 |
| **Transfer**       | Confirm trong MetaMask popup     | Direct trong UI                |
| **Security**       | Private keys trong MetaMask      | Private keys hiển thị trong UI |
| **Use Case**       | Development + Production         | Development only               |

---

## 🚀 Nâng Cao

### Thêm nhiều Hardhat accounts hơn

Edit `loadHardhatAccounts()` trong code:

```javascript
const hardhatAccounts = [
  // Thêm private keys từ Hardhat node output
  "0xPRIVATE_KEY_6",
  "0xPRIVATE_KEY_7",
  // ... up to 20 accounts
];
```

### Custom RPC endpoint

Thay đổi `RPC_URL`:

```javascript
const RPC_URL = "http://localhost:8545"; // hoặc IP khác
```

---

## ✅ Checklist

Trước khi bắt đầu, đảm bảo:

- [ ] Hardhat node đang chạy
- [ ] SimpleWallet contract đã deploy
- [ ] Contract address đã cập nhật trong App.js
- [ ] Frontend đang chạy (npm start)
- [ ] Browser đã mở http://localhost:3000

Sau khi setup:

- [ ] Thấy 5 accounts trong sidebar
- [ ] Mỗi account có ~10000 ETH
- [ ] Network Info hiển thị đúng
- [ ] Có thể chọn accounts
- [ ] Có thể transfer ETH
- [ ] Transactions xuất hiện trong history

---

**Enjoy your Standalone Wallet DApp! 🎉**
