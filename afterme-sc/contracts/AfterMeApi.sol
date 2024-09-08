// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract AfterMeApi is FunctionsClient, ConfirmedOwner {
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

    function postMessage() public onlyOwner returns (bytes32) {
        string memory source = "return await fetch(args[0], { method: 'POST', body: args[1] }).then(response => response.text());";

        string[] memory args = new string[](2);
        args[0] = "https://hook.eu2.make.com/3pa9tfjwadg0bp8v2gi2iw78wsnc5dge";
        args[1] = '{"content": "I am far too successful to be embarrassed by this incident", "timestamp": "2023-08-07T05:31:12.156888Z", "bluesky.identifier": "peterhorvath.bsky.social", "bluesky.password": "ekz5-oqxb-xg4q-6q73", "mastodon.client_id": "cFxDuou4jnIpSVUVKyFoDr0v_JUE5HBTSvVRqDddabU", "mastodon.client_secret": "Vkh-z9veEorvWIxTmGjssfTPvAkXHbHsJdVoQv33nwE", "mastodon.redirect_uri": "urn:ietf:wg:oauth:2.0:oob", "mastodon.access_token": "SDpKjmq0Sj1PafJtD94IfLHGqOuyb5-Y5yXrDUNnphE"}';

        bytes32 requestId;
        try this.sendRequest(
            source,
            new bytes(0),
            0,
            0,
            args,
            new bytes[](0),
            12345, // Replace with your actual subscription ID
            500000,
            bytes32(0)
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