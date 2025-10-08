// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleWallet
 * @dev Contract cho phép transfer ETH và theo dõi lịch sử giao dịch
 */
contract SimpleWallet {
    
    // Struct để lưu thông tin giao dịch
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string message;
    }
    
    // Mảng lưu tất cả các giao dịch
    Transaction[] public transactions;
    
    // Mapping để theo dõi balance của mỗi địa chỉ
    mapping(address => uint256) public balances;
    
    // Events
    event Deposit(address indexed from, uint256 amount, uint256 timestamp);
    event Transfer(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp);
    event Withdrawal(address indexed to, uint256 amount, uint256 timestamp);
    
    /**
     * @dev Nhận ETH vào contract
     */
    receive() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @dev Nạp tiền vào contract
     */
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @dev Chuyển ETH cho địa chỉ khác
     * @param _to Địa chỉ người nhận
     * @param _message Tin nhắn kèm theo (optional)
     */
    function transfer(address payable _to, string memory _message) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_to != address(0), "Invalid recipient address");
        require(_to != msg.sender, "Cannot transfer to yourself");
        
        // Chuyển ETH
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "Transfer failed");
        
        // Lưu giao dịch
        transactions.push(Transaction({
            from: msg.sender,
            to: _to,
            amount: msg.value,
            timestamp: block.timestamp,
            message: _message
        }));
        
        emit Transfer(msg.sender, _to, msg.value, _message, block.timestamp);
    }
    
    /**
     * @dev Rút tiền từ contract (nếu có balance)
     * @param _amount Số tiền muốn rút
     */
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Withdrawal failed");
        
        emit Withdrawal(msg.sender, _amount, block.timestamp);
    }
    
    /**
     * @dev Lấy tổng số giao dịch
     */
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
    
    /**
     * @dev Lấy thông tin giao dịch theo index
     */
    function getTransaction(uint256 _index) public view returns (
        address from,
        address to,
        uint256 amount,
        uint256 timestamp,
        string memory message
    ) {
        require(_index < transactions.length, "Invalid transaction index");
        Transaction memory txn = transactions[_index];
        return (txn.from, txn.to, txn.amount, txn.timestamp, txn.message);
    }
    
    /**
     * @dev Lấy tất cả giao dịch của một địa chỉ
     */
    function getTransactionsByAddress(address _addr) public view returns (Transaction[] memory) {
        uint256 count = 0;
        
        // Đếm số giao dịch liên quan đến địa chỉ
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].from == _addr || transactions[i].to == _addr) {
                count++;
            }
        }
        
        // Tạo mảng kết quả
        Transaction[] memory result = new Transaction[](count);
        uint256 resultIndex = 0;
        
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].from == _addr || transactions[i].to == _addr) {
                result[resultIndex] = transactions[i];
                resultIndex++;
            }
        }
        
        return result;
    }
    
    /**
     * @dev Lấy số dư ETH trong contract
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Lấy balance của một địa chỉ trong contract
     */
    function getBalance(address _addr) public view returns (uint256) {
        return balances[_addr];
    }
}