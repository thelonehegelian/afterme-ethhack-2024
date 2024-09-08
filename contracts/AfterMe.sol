// SPDX-License-Identifier: MIT
// Listening to event Trigger, Retrieving Encrypted Data and Sending a Post request
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "hardhat/console.sol";

contract AfterMe is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public executeAfterTimestamp;
    uint256 public data;
    bytes32 private jobId;
    uint256 private fee;

    event FunctionTriggered(uint256 timestamp);
    event DataFetched(bytes32 requestId, uint256 data);
    event DataPosted(bytes32 requestId, bytes data);

    constructor() ConfirmedOwner(msg.sender) {
        _setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        _setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";  // Chainlink Job ID
        fee = (1 * LINK_DIVISIBILITY) / 10;  // 0.1 LINK
    }

    function setExecuteAfter(uint256 _time) external onlyOwner {
        require(_time > block.timestamp, "Time must be in the future");
        executeAfterTimestamp = _time;
    }

    /// MAIN TRIGGER
    function triggerIfTimePassed() external {
        require(block.timestamp >= executeAfterTimestamp, "Not yet time to execute");

        // Request data from Tableland
        // console.log("let's debug");
        requestTablelandData();
    }

    /// GETS DATA FROM TABLELAND
    function requestTablelandData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillTableland.selector
        );

        string memory url = "https://testnets.tableland.network/api/v1/query?unwrap=true&statement=SELECT%20*%20FROM%20after_me__11155111_1808";
        req._add("get", url);
        req._add("path", "Bobby Tables");

        return _sendChainlinkRequest(req, fee);
    }

    // SEND THE DATA TO LIT PROTOCOL FOR DECRYPTION
    function fulfillTableland(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId) {
        data = _data;
        emit DataFetched(_requestId, _data);

        // Encrypt the data
        // string memory encryptedData = encryptData(_data);

        // Send POST request with encrypted data
        console.log("Send POST request with encrypted data");
        // sendEncryptedData(_data);
    }

    // /// Encryption placeholder function (not needed as encryption is done by Lit Protocol)
    // function encryptData(uint256 _data) internal pure returns (string memory) {
    //     return string(abi.encodePacked("encrypted:", uint2str(_data)));
    // }

    /// INTERNAL FUNCTION TO SEND ENCRYPTED DATA TO LIT PROTOCOL
    function sendEncryptedData(string memory encryptedData) internal returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillEncryptedDataPost.selector
        );

        string memory url = "https://hook.eu2.make.com/3pa9tfjwadg0bp8v2gi2iw78wsnc5dge";
        req._add("post", url);
        req._add("body", encryptedData);

        return _sendChainlinkRequest(req, fee);
    }

    // Fulfill POST request with encrypted data
    

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

    // Function to fund the contract with LINK tokens
    function fundContract(uint256 amount) external onlyOwner {
        require(IERC20(0x779877A7B0D9E8603169DdbD7836e478b4624789).transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }
}

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}