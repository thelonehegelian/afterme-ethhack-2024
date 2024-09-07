// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LitAccess {
    struct EncryptedData {
        address owner;
        string encryptedData;  // Encrypted data as a string
        uint256 unlockTime;    // Timestamp when access is granted
        string accessControlConditions; // Serialized access conditions
    }

    mapping(address => EncryptedData) public dataStore;

    function submitData(string memory _encryptedData, uint256 _unlockTime, string memory _accessControlConditions) public {
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");
        
        dataStore[msg.sender] = EncryptedData({
            owner: msg.sender,
            encryptedData: _encryptedData,
            unlockTime: _unlockTime,
            accessControlConditions: _accessControlConditions
        });
    }

    function retrieveData(address _user) public view returns (string memory) {
        EncryptedData memory storedData = dataStore[_user];
        require(block.timestamp >= storedData.unlockTime, "Data is still locked");
        return storedData.encryptedData;
    }
}
