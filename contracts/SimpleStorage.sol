// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleStorage
 * @dev Contract đơn giản để lưu trữ và lấy một giá trị số
 */
contract SimpleStorage {
    // Biến lưu trữ giá trị
    uint256 private value;
    
    // Event phát ra khi giá trị thay đổi
    event ValueChanged(uint256 newValue);
    
    /**
     * @dev Lưu giá trị mới vào contract
     * @param newValue Giá trị mới cần lưu
     */
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }
    
    /**
     * @dev Lấy giá trị hiện tại từ contract
     * @return Giá trị đã lưu
     */
    function retrieve() public view returns (uint256) {
        return value;
    }
}