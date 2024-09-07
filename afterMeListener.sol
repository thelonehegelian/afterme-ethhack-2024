pragma solidity ^0.8.26;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";

// @dev This contract manages the execution of AfterMe plan. We are separating the AfterMe logic from the hook to make things easier
// to read.
contract AfterMeListener is Ownable, ISPHook {
    // white list is who can be trigger via attestation (eg insurance company)
    mapping(address attester => bool allowed) public whitelist;

    constructor() Ownable(_msgSender()) { }

    function setWhitelist(address attester, bool allowed) external onlyOwner {
        whitelist[attester] = allowed;
    }

    function _checkAttesterAndExecuteAfterMePlan(address attester) internal view {
        // solhint-disable-next-line custom-errors
        require(whitelist[attester], 'UnauthorizedAttester');

        // ... start doing after me things
    }

    // Sign procotol stuff
    function didReceiveAttestation(
        address attester,
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    )
        external
        payable
    {
        _checkAttesterAndExecuteAfterMePlan(attester);
    }

    function didReceiveAttestation(
        address attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    )
        external
        view
    {
        _checkAttesterAndExecuteAfterMePlan(attester);
    }

    function didReceiveRevocation(
        address attester,
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    )
        external
        payable
    {
        _checkAttesterAndExecuteAfterMePlan(attester);
    }

    function didReceiveRevocation(
        address attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    )
        external
        view
    {
        _checkAttesterAndExecuteAfterMePlan(attester);
    }
}