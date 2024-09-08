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
// Create attestation
const attestationInfo = await client.createAttestation({
  schemaId: "SPS_PyndP9OQdcGsYqTzYoXHv", // `schemaInfo.schemaId` or other `schemaId`
  data: {
    policyHolderName: "Alice",
    policyHolderID: "123456",
    dateOfBirth: "1990-01-01",
    policyNumber: "123456789",
    policyType: "term life",
    policyStartDate: "2022-01-01",
    policyEndDate: "2023-01-01",
    beneficiaryName: "Bob",
    beneficiaryID: "654321",
    coverageAmount: 100000,
    premiumAmount: 1000,
    paymentFrequency: "monthly",
    claimID: "null",
    claimDate: "null",
    claimStatus: "null",
    attestationDate: "2022-01-01",
    verifiedBy: "Charlie",
  },
  indexingValue: "1",
  recipients: ["0xcE285c85FC474C3e1A06e62260782766e6DBBd0D"],
});

console.log("Attestation created:", attestationInfo);
