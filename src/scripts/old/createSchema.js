import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
} from "@ethsign/sp-sdk";
import { Wallet } from "ethers";
import { privateKeyToAccount } from "viem/accounts";
const userPrivateKey = Wallet.createRandom().privateKey; // Optional
const client = new SignProtocolClient(SpMode.OffChain, {
  chain: EvmChains.baseSepolia,
  signType: OffChainSignType.EvmEip712,
  account: privateKeyToAccount(userPrivateKey), // Optional
});

// Create schema
const schemaInfo = await client.createSchema({
  name: "test_after",
  data: [
    { name: "policyHolderName", type: "string" },
    { name: "policyHolderID", type: "string" },
    { name: "dateOfBirth", type: "string" }, // Assuming 'YYYY-MM-DD' format
    { name: "policyNumber", type: "string" },
    { name: "policyType", type: "string" }, // e.g., "term life", "whole life"
    { name: "policyStartDate", type: "string" }, // 'YYYY-MM-DD' format
    { name: "policyEndDate", type: "string" }, // 'YYYY-MM-DD' format
    { name: "beneficiaryName", type: "string" },
    { name: "beneficiaryID", type: "string" },
    { name: "coverageAmount", type: "number" }, // Amount in relevant currency
    { name: "premiumAmount", type: "number" }, // Amount in relevant currency
    { name: "paymentFrequency", type: "string" }, // e.g., "monthly", "annual"
    { name: "claimID", type: "string" }, // Optional, can be null if no claim
    { name: "claimDate", type: "string" }, // Optional, 'YYYY-MM-DD' format
    { name: "claimStatus", type: "string" }, // Optional, e.g., "Pending", "Approved", "Rejected"
    { name: "attestationDate", type: "string" }, // 'YYYY-MM-DD' format
    { name: "verifiedBy", type: "string" }, // Name or ID of the verifier
    { name: "digitalSignature", type: "string" }, // Digital signature for verification
  ],
});

console.log("Schema created:", schemaInfo);
