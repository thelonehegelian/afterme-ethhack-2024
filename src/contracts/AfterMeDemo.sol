// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "hardhat/console.sol";

contract AfterMe is ChainlinkClient, ConfirmedOwner {
    AfterMe2 public afterMe2;

    using Chainlink for Chainlink.Request;

    uint256 public executeAfterTimestamp;
    uint256 public data;
    bytes32 private jobId;
    uint256 private fee;

    event FunctionTriggered(uint256 timestamp);
    event DataFetched(bytes32 requestId, uint256 data);
    event DataPosted(bytes32 requestId, bytes data);

    constructor(address _afterMe2Address) ConfirmedOwner(msg.sender) {
        _setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        _setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";  // Chainlink Job ID
        fee = (1 * LINK_DIVISIBILITY) / 10;  // 0.1 LINK
        afterMe2 = AfterMe2(_afterMe2Address);
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


    /// Fulfill POST request with encrypted data
    function fulfillEncryptedDataPost(bytes32 _requestId, bytes memory _data) public recordChainlinkFulfillment(_requestId) {
        emit DataPosted(_requestId, _data);

        // Prepare JSON body for the second POST request
        // For dev pureposes we declare jsonBody in sendSecondPostRequest

        // Send the second POST request
        sendSecondPostRequest();
    }

    /// INTERNAL FUNCTION TO SEND FINAL POST REQUEST
    // For dev pureposes we made this function public
    function sendSecondPostRequest() public returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillSecondPostRequest.selector
        );

        string memory url = "https://hook.eu2.make.com/3pa9tfjwadg0bp8v2gi2iw78wsnc5dge";
        string memory jsonBody = '{"content": "I am far too successful to be embarrassed by this incident ","timestamp": "2023-08-07T05:31:12.156888Z","bluesky.identifier": "peterhorvath.bsky.social","bluesky.password": "ekz5-oqxb-xg4q-6q73","mastodon.client_id": "cFxDuou4jnIpSVUVKyFoDr0v_JUE5HBTSvVRqDddabU","mastodon.client_secret": "Vkh-z9veEorvWIxTmGjssfTPvAkXHbHsJdVoQv33nwE","mastodon.redirect_uri": "urn:ietf:wg:oauth:2.0:oob","mastodon.access_token": "SDpKjmq0Sj1PafJtD94IfLHGqOuyb5-Y5yXrDUNnphE"}';
        req._add("post", url);
        req._add("body", jsonBody);

        return _sendChainlinkRequest(req, fee);
    }

    function fulfillSecondPostRequest(bytes32 _requestId, bytes memory _data) public recordChainlinkFulfillment(_requestId) {
        emit FunctionTriggered(block.timestamp);
        executeLogic();
    }

    function executeLogic() public {
        // Add custom logic here for execution after the second POST request
        afterMe2.postMessage();
    }

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


import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract AfterMe2 is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event PostMessageError(string errorMessage);

    address constant router = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;

    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    function sendRequest(
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) public onlyOwner returns (bytes32) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        if (args.length > 0) req.setArgs(args);
        if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        s_lastError = err;
        emit Response(requestId, s_lastResponse, s_lastError);
    }

    function getOwner() public view returns (address) {
        return owner();
    }

    function postMessage() public returns (bytes32) {
        string memory source = "return await fetch(args[0], { method: 'POST', body: args[1] }).then(response => response.text());";

        string[] memory args = new string[](2);
        args[0] = "https://hook.eu2.make.com/3pa9tfjwadg0bp8v2gi2iw78wsnc5dge";
        args[1] = '{"content": "0xawaz test!", "timestamp": "2023-08-07T05:31:12.156888Z", "bluesky.identifier": "peterhorvath.bsky.social", "bluesky.password": "ekz5-oqxb-xg4q-6q73", "mastodon.client_id": "cFxDuou4jnIpSVUVKyFoDr0v_JUE5HBTSvVRqDddabU", "mastodon.client_secret": "Vkh-z9veEorvWIxTmGjssfTPvAkXHbHsJdVoQv33nwE", "mastodon.redirect_uri": "urn:ietf:wg:oauth:2.0:oob", "mastodon.access_token": "SDpKjmq0Sj1PafJtD94IfLHGqOuyb5-Y5yXrDUNnphE"}';

        bytes32 requestId;
        try this.sendRequest(
            source,
            new bytes(0),
            0,
            0,
            args,
            new bytes[](0),
            3465,  // created a subscription in https://functions.chain.link/
            300000,  // Recommended gas limit
            0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000  // DON ID for Ethereum Sepolia
        ) returns (bytes32 _requestId) {
            requestId = _requestId;
        } catch Error(string memory errorMessage) {
            emit PostMessageError(errorMessage);
            revert(errorMessage);
        } catch (bytes memory) {
            emit PostMessageError("Low-level error encountered");
            revert("Low-level error encountered");
        }

        return requestId;
    }
}

